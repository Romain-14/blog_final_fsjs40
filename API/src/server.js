import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import session from "express-session";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const MySQLStore = require("express-mysql-session")(session);

import ROUTER from "./router/index.routes.js";
import pool from "./config/db.js";

const app = express();

const PORT = process.env.PORT || process.env.LOCAL_PORT;

// ici on autorise à communiquer avec notre serveur uniquement l'origin http://localhost:5173
// on autorise les cookies pour les requêtes cross-origin (credentials: true)
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
		methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type"],
	})
);

app.use(
	session({
		secret: process.env.SECRET_KEY_SESSION,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, // 24h
			httpOnly: true,
			secure: false,
		},
		store: new MySQLStore({
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
		}),
	})
);

app.use("/img", express.static(path.join(process.cwd(), "public/img")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(async (req, res, next) => {
	console.log("user session", req.session.user);

	try {
		const [[result]] = await pool.query(
			"SELECT COUNT(session_id) AS session FROM sessions"
		);

		// const sessions = rows.map(row => JSON.parse(row.data));
		console.log("Active sessions:", result.session);
		console.log(
			"User session:",
			req.session.user ? req.session : "No user session"
		);
		next();
	} catch (err) {
		console.error("Error fetching sessions:", err.message);
	}
});

app.use(["/api/v1", "/"], ROUTER);

app.listen(PORT, () =>
	console.log(`Server is running at http://localhost:${PORT}`)
);

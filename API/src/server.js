import "dotenv/config";
import express from "express";
import cors from "cors";

import ROUTER from "./router/index.routes.js";

const app = express();

const PORT = process.env.PORT || process.env.LOCAL_PORT;

// ici on autorise à communiquer avec notre serveur uniquement l'origin http://localhost:5173
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(["/api/v1", "/"], ROUTER);

app.listen(PORT, () =>
	console.log(`Server is running at http://localhost:${PORT}`)
);

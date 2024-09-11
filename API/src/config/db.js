import mysql from "mysql2/promise";

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	connectionLimit: 10, // sert à limiter le nombre de connexions simultanées à la base de données
	queueLimit: 0, // sert à limiter le nombre de connexions en attente
	waitForConnections: true, // sert à déterminer si le pool doit attendre une connexion disponible avant de renvoyer une erreur
});

// pool.getConnection()
// 	.then((connection) => {
// 		console.log("Connected to DB ", connection.config.database);
// 		connection.release();
// 	})
// 	.catch((err) => {
// 		console.log("Error connecting to DB: ", err);
// 	});

export default pool;

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({   // With docker, we still require the same connection pool to mySQL
    host: process.env.DB_HOST,          
    port: Number(process.env.DB_PORT),  // 127.0.0.1:3307
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log("MySQL connection pool configured!");

export default db;
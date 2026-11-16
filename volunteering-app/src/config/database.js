import mysql from "mysql2/promise";
import dotenv from "dotenv"; // a .env file in node_modules contains your pc's local mySQL info

dotenv.config();

 // Creating a connection pool makes it so we dont open/close a new database connection for each request
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// This will allow other files to import & use this connection pool
export default pool;

// write something like:
// import { query } from "./config/database.js";
import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);

// Locate the database file in the project root's database folder
const databasePath = path.resolve(
    currentDirectory,
    "../../database/volunteer_tracker.db"
);

// Open or create the database
const db = new Database(databasePath);

// Enable foreign key constraints
db.pragma("foreign_keys = ON");

// Enable write-ahead logging
db.pragma("journal_mode = WAL");

console.log("Connected to SQLite database!");

export default db;
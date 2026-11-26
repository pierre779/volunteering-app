import db from "../config/sqlite.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);

// schema
const schemaPath = path.resolve(
    currentDirectory,
    "../../database/schema.sqlite.sql"
);

try {
    const schema = fs.readFileSync(schemaPath, "utf8");

    db.exec(schema);

    console.log("SQLite database tables created successfully!");

} catch (error) {
    console.error("Database initialization failed:", error);

} finally {
    db.close();
}
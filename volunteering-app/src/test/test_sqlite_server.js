import express from "express";
import db from "../config/sqlite.js";

const app = express();

app.use(express.json()); // recognise / parse .json requests

// Test SQLite connection
app.get("/api/test-db", (req, res) => { // GET 
    try {
        const results = db.prepare( // retrieving all users
            "SELECT * FROM Users"
        )
            .all();

        res.json(results);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database query failed"
        });
    }
});

// Test inserting a user
app.post("/api/test-db", (req, res) => { // POST
    try {
        if (!req.body) {
            return res.status(400).json({
                message: "Request body is missing."
            });
        }

        const { email, password, firstName, lastName } = req.body;

        // Checks for any missing fields
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const result = db.prepare(`
            INSERT INTO Users (email, user_password, first_name, last_name)
            VALUES (?, ?, ?, ?)
        `).run(email, password, firstName, lastName);

        res.status(201).json({
            message: "User created successfully!",
            userID: result.lastInsertRowid
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create user."
        });
    }
});

// starts locally hosted server
app.listen(5001, () => {
    console.log("SQLite test server running on port 5001");
});
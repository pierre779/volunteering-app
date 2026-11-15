import express from "express";
import database from "./config/database.js";

const app = express();
app.use(express.json());

app.get("/api/test-db", async (req, res) => {
    try {
        const [results] = await database.query( // Attempt Retrieving all Users
            "SELECT * FROM Users"
        );

        res.json(results);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database query failed"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

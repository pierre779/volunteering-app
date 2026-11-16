import express from "express";
import database from "./config/database.js";
import cors from "cors"

const app = express();
app.use(express.json());


app.use(cors({
    origin: ['http://localhost:5173'],
}))

app.get("/api/test-db", async (req, res) => {
    try {

        // Attempt Retrieving all Users
        const [results] = await database.query( 
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


// Back-end will respond to a POST request at this address
app.post("/api/v1/signup", async (req, res) => {

    // Tells front-end we're returning plain-text
    res.setHeader("Content-Type", 'text/plain');

    try {
        // Grabs the account info
        const account_info = req.body;

        // Inserts account information into the database
        // NOTE: I put placeholder values in first_name, last_name, & date_created as the front-end doesn't provide those yet
        const [results] = await database.query( 
            "INSERT INTO Users (email, user_password, first_name, last_name, date_created) VALUES (?, ?, 'null', 'nill', null)"
            // Replaces the question marks with account email & password
        , [account_info.email, account_info.password]);

        console.log(results)
        
        // Telling front-end that the account creation was successful
        res.write("Good");
        res.status(200);
        res.end();
        
    }
    catch (error) {
        console.error(error);

        res.setHeader("Content-Type", 'text/plain');

        // Sending the error message back to the front-end
        res.write(error);
        res.status(500);
        res.end();
    }
})

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

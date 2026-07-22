const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { app } = require("../server");

const db = new sqlite3.Database(
    path.join(__dirname, "buswatch360.db"),
    (err) => {
        if (err) {
            console.error("Database connection failed:", err.message);
        } else {
            console.log("✅ Connected to BusWatch360 database.");
        }
    }
);

db.serialize(() => {
    // Database initialization can go here
});

module.exports = db;
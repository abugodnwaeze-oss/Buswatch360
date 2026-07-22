const sqlite3 = require("sqlite3").verbose();
const path = require("path");

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

    // ==========================
    // STUDENTS TABLE
    // ==========================

    db.run(`
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullName TEXT NOT NULL,
            studentClass TEXT NOT NULL,
            bus TEXT NOT NULL,
            status TEXT DEFAULT 'Waiting'
        )
    `);

    // ==========================
    // BUSES TABLE
    // ==========================

    db.run(`
        CREATE TABLE IF NOT EXISTS buses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            busName TEXT NOT NULL,
            plateNumber TEXT NOT NULL,
            capacity INTEGER,
            driver TEXT,
            status TEXT DEFAULT 'Available'
        )
    `);

    // ==========================
    // DRIVERS TABLE
    // ==========================

    db.run(`
        CREATE TABLE IF NOT EXISTS drivers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            driverName TEXT NOT NULL,
            phone TEXT NOT NULL,
            licenseNumber TEXT NOT NULL,
            assignedBus TEXT NOT NULL,
            status TEXT DEFAULT 'Available'
        )
    `);

});

module.exports = db;
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const db = require("./database/database");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Login page
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Admin page
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// Students page
app.get("/students", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "students.html"));
});app.get("/students/all", (req, res) => {

    db.all("SELECT * FROM students", [], (err, rows) => {

        if (err) {
            console.log(err.message);
            return res.status(500).json([]);
        }

        res.json(rows);

    });

});

// Add student API
app.post("/students/add", (req, res) => {

    const { fullName, studentClass, bus } = req.body;

    db.run(
        `INSERT INTO students (fullName, studentClass, bus)
        VALUES (?, ?, ?)`,
        [fullName, studentClass, bus],

        function (err) {

            if (err) {
                console.log(err.message);
                return res.send("Error saving student.");
            }

            res.send("Student saved successfully!");

        }
    );

});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 BusWatch360 running at http://localhost:${PORT}`);
});
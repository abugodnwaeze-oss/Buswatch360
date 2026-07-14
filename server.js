const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const db = require("./Database/database");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "Public")));

// ==========================
// PAGES
// ==========================

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "index.html"));
});

// Login page
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "login.html"));
});

// Admin page
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "admin.html"));
});

// Students page
app.get("/students", (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "students.html"));
});

// ==========================
// STUDENT API
// ==========================

// Get all students
app.get("/students/all", (req, res) => {

    db.all("SELECT * FROM students", [], (err, rows) => {

        if (err) {
            console.log(err.message);
            return res.status(500).json([]);
        }

        res.json(rows);

    });

});

// Add student
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

// Delete student
app.delete("/students/delete/:id", (req, res) => {

    const id = req.params.id;

    db.run(
        "DELETE FROM students WHERE id = ?",
        [id],

        function (err) {

            if (err) {
                console.log(err.message);
                return res.send("Error deleting student.");
            }

            if (this.changes === 0) {
                return res.send("Student not found.");
            }

            res.send("Student deleted successfully!");

        }

    );

});

// ==========================
// START SERVER
// ==========================

app.listen(PORT, () => {
    console.log(`🚀 BusWatch360 running at http://localhost:${PORT}`);
});
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const db = require("./Database/database");

// ==========================
// MIDDLEWARE
// ==========================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Public")));

// ==========================
// PAGES
// ==========================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "login.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "admin.html"));
});

app.get("/students", (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "students.html"));
});

app.get("/buses", (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "buses.html"));
});

app.get("/drivers", (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "drivers.html"));
});

app.get("/trip-centre", (req, res) => {
    res.sendFile(path.join(__dirname, "Public", "trip-centre.html"));
});

// ==========================
// STUDENTS
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

    const {
        fullName,
        studentClass,
        bus
    } = req.body;

    db.run(
        `INSERT INTO students
        (fullName, studentClass, bus)
        VALUES (?, ?, ?)`,
        [
            fullName,
            studentClass,
            bus
        ],

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

    db.run(
        "DELETE FROM students WHERE id = ?",
        [req.params.id],

        function (err) {

            if (err) {
                return res.send("Error deleting student.");
            }

            res.send("Student deleted successfully!");

        }

    );

});

// ==========================
// BUSES
// ==========================

// Get all buses
app.get("/buses/all", (req, res) => {

    db.all("SELECT * FROM buses", [], (err, rows) => {

        if (err) {
            return res.status(500).json([]);
        }

        res.json(rows);

    });

});

// Add bus
app.post("/buses/add", (req, res) => {

    const {
        busName,
        plateNumber,
        capacity,
        driver
    } = req.body;

    db.get(
        "SELECT * FROM buses WHERE driver = ?",
        [driver],

        (err, row) => {

            if (err) {
                console.log(err.message);
                return res.send("Database error.");
            }

            if (row) {
                return res.send(
                    `Driver "${driver}" is already assigned to ${row.busName}.`
                );
            }

            db.run(
                `INSERT INTO buses
                (busName, plateNumber, capacity, driver)
                VALUES (?, ?, ?, ?)`,

                [
                    busName,
                    plateNumber,
                    capacity,
                    driver
                ],

                function (err) {

                    if (err) {
                        console.log(err.message);
                        return res.send("Error saving bus.");
                    }

                    res.send("Bus saved successfully!");

                }

            );

        }

    );

});// Delete bus
app.delete("/buses/delete/:id", (req, res) => {

    db.run(
        "DELETE FROM buses WHERE id = ?",
        [req.params.id],

        function (err) {

            if (err) {
                console.log(err.message);
                return res.send("Error deleting bus.");
            }

            res.send("Bus deleted successfully!");

        }

    );

});

// ==========================
// DRIVERS
// ==========================

// Get all drivers
app.get("/drivers/all", (req, res) => {

    db.all("SELECT * FROM drivers", [], (err, rows) => {

        if (err) {
            console.log(err.message);
            return res.status(500).json([]);
        }

        res.json(rows);

    });

});

// Add driver
app.post("/drivers/add", (req, res) => {

    const {
        driverName,
        phone,
        licenseNumber,
        assignedBus
    } = req.body;

    db.run(
        `INSERT INTO drivers
        (driverName, phone, licenseNumber, assignedBus)
        VALUES (?, ?, ?, ?)`,

        [
            driverName,
            phone,
            licenseNumber,
            assignedBus
        ],

        function (err) {

            if (err) {
                console.log(err.message);
                return res.send("Error saving driver.");
            }

            res.send("Driver saved successfully!");

        }

    );

});

// Delete driver
app.delete("/drivers/delete/:id", (req, res) => {

    db.run(
        "DELETE FROM drivers WHERE id = ?",
        [req.params.id],

        function (err) {

            if (err) {
                console.log(err.message);
                return res.send("Error deleting driver.");
            }

            res.send("Driver deleted successfully!");

        }

    );

});

// ==========================
// TRIP CENTRE
// ==========================

// Future Trip Centre APIs will be added here.

// ==========================
// START SERVER
// ==========================

app.listen(PORT, () => {

    console.log(`🚀 BusWatch360 running at http://localhost:${PORT}`);

});
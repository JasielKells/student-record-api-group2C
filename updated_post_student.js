const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Temporary in-memory storage for student records
let students = [];

/*
 * POST /students
 * Creates a new student record.
 *
 * Improvements added:
 * - Validates required fields (name, course, age).
 * - Ensures age is greater than zero.
 * - Returns appropriate HTTP status codes and error messages.
 */
app.post("/students", (req, res) => {

    // Extract student details from the request body
    const { name, course, age } = req.body;

    // Check that all required fields are provided
    if (!name.trim() || !course.trim() || age === undefined) {
        return res.status(400).json({
            message: "Name, course and age are required."
        });
    }

    // Validate that the age is a positive number
    if (typeof age !== "number" || age <= 0) {
        return res.status(400).json({
            message: "Age must be a positive number greater than zero."
        });
    }

    // Create a new student object
    const student = {
        id: students.length + 1,
        name,
        course,
        age
    };

    // Add the new student to the array
    students.push(student);

    // Return the created student with HTTP 201 (Created)
    res.status(201).json(student);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

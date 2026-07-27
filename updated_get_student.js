const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());

// Sample student data (temporary in-memory database)
let students = [
    {
        id: 1,
        name: "Benjamin",
        course: "Cloud Computing",
        age: 22
    }
];

/*
 * GET /students
 * Retrieves all student records.
 *
 * Improvements added:
 * - Returns a message describing the result.
 * - Returns the total number of students.
 * - Includes a timestamp showing when the response was generated.
 * - Handles the case where no student records exist.
 */
app.get("/students", (req, res) => {

    // Check if the students array is empty
    if (students.length === 0) {

        // Return an informative response instead of an empty array only
        return res.status(200).json({
            message: "No students found.",
            count: 0,
            timestamp: new Date().toISOString(),
            students
        });
    }

    // Return all student records with additional metadata
    res.status(200).json({
        message: "Students retrieved successfully.",
        count: students.length,
        timestamp: new Date().toISOString(),
        students
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
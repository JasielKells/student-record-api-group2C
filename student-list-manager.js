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

// Get one student by ID
app.get("/students/:id", (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find((s) => s.id === studentId);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json({
        message: "Student retrieved successfully",
        student
    });
});


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
    if (!name || !name.trim() || !course || !course.trim() || age === undefined || age === null || age === "") {
        return res.status(400).json({
            message: "Name, course and age are required."
        });
    }

    const ageNum = Number(age);

    // Validate that age is a positive number
    if (!Number.isInteger(ageNum) || ageNum <= 0) {
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


// Update one student by ID (partial update)
app.patch("/students/:id", (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find((s) => s.id === studentId);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, course, age } = req.body;

    if (name !== undefined) student.name = name;
    if (course !== undefined) student.course = course;
    if (age !== undefined) student.age = age;

    res.status(200).json({
        message: "Student updated successfully",
        student
    });
});


// Update one student by ID (full update)
app.put("/students/:id", (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find((s) => s.id === studentId);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, course, age } = req.body;

    if (!name || !course || age === undefined) {
        return res.status(400).json({
            message: "Name, course and age are required."
        });
    }

    student.name = name;
    student.course = course;
    student.age = age;

    res.status(200).json({
        message: "Student updated successfully",
        student
    });
});


// Delete one student by ID
app.delete("/students/:id", (req, res) => {
    const studentId = parseInt(req.params.id);
    const initialLength = students.length;

    students = students.filter((s) => s.id !== studentId);

    if (students.length === initialLength) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json({
        message: "Student deleted successfully"
    });
});

// Added a middleware to handle invalid JSON during test cases
/* 
    app.use((err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
            return res.status(400).json({
                message: "Invalid JSON format."
            });
        }

        next(err);
    });
*/


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
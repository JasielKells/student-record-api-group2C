const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());

let students = [
    {
        id: 1,
        name: "Benjamin",
        course: "Cloud Computing",
        age: 22
    }
];

app.get("/students", (req, res) => {
    if (students.length === 0) {
        return res.status(202).json({
            message: "No students found.",
            count: 0,
            timestamp: new Date().toISOString,
            students: []
        });
    }

    res.status(200).json({
        message: "Students retrieved successfully.",
        count: students.length,
        timestamp: new Date().toISOString(),
        student
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let students = [];

app.post("/students", (req, res) => {

    const { name, course, age } = req.body;

    if (!name || !course || age === undefined) {
        return res.status(400).json({
            message: "Name, course and age are required."
        });
    }

    if (age <= 0) {
        return res.status(400).json({
            message: "Age must be greater than zero."
        });
    }

    const student = {
        id: students.length + 1,
        name,
        course,
        age
    };

    students.push(student);

    res.status(201).json(student);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

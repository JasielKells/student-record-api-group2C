const express = require("express");
const app = express();

// Body parsing Middleware
app.use(express.json());

// in-memory data (Temporary database)
let students = [
    {
        id: 1,
        name: "Mugisha Akram",
        age: 21,
        course: "Computer Science",
        year: 2
    },
    {
        id: 2,
        name: "Muhoozi Shukuran",
        age: 22,
        course: "Information Technology",
        year: 3
    }
];

// GET all students
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// GET one student
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      error: "Student not found",
    });
  }
  res.status(200).json(student);
});

// POST - Add a new student
app.post("/students", (req, res) => {
  const { name, course, age, year } = req.body;

  // Validation
  if (
    !name?.trim() ||
    !course?.trim() ||
    age === undefined ||
    year === undefined
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Validate numeric fields
  if (Number.isNaN(Number(age)) || Number.isNaN(Number(year))) {
    return res.status(400).json({
      error: "Age and year must be numbers",
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    course,
    age: Number(age),
    year: Number(year),
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PATCH - Update a student
app.patch("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({
            error: "Student not found"
        });
    }

    Object.assign(student, req.body);

    res.status(200).json(student);

});
// DELETE - Remove a student
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = students.length;
    students = students.filter((s) => s.id !== id);
    if (students.length === initialLength) {
        return res.status(404).json({ 
            error: "Student not found"
        });
    }
    res.status(200).json({ 
        message: "Student deleted successfully" 
    });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

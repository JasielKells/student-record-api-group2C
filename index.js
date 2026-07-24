const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to read JSON from Postman/body
app.use(express.json());

// Temporary "database" - just an array
let students = [
  { id: 1, name: "Zakiat", course: "Computer Science", age: 20 },
  { id: 2, name: "Muctada", course: "Engineering", age: 17 }
];

// 1. CREATE - Add a new student
// POST http://localhost:3000/students
app.post('/students', (req, res) => {
  const { name, course, age } = req.body;
  
  if (!name ||!course) {
    return res.status(400).json({ message: "Name and course are required" });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    course,
    age
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
})

// 2. READ - View all students
// GET http://localhost:3000/students
app.get('/students', (req, res) => {
  res.json(students);
});

// 3. READ - View one student by ID
// GET http://localhost:3000/students/1
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
});

// 4. UPDATE - Edit a student
// PUT http://localhost:3000/students/1
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);
  
  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students[studentIndex] = {...students[studentIndex],...req.body };
  res.json(students[studentIndex]);
});

// 5. DELETE - Remove a student
// DELETE http://localhost:3000/students/1
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id!== id);
  res.json({ message: `Student ${id} deleted` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
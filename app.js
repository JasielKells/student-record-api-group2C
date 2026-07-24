require('dotenv').config();
const express = require("express");
const app = express();

app.use(express.json());

const studentList = [
    { id: 1, name: "John Smart", age: 20 },
    { id: 2, name: "Cave Adullam", age: 22 },
    { id: 3, name: "Agboola Feranmi", age: 19 },
    { id: 4, name: "Emmy Daniel", age: 21},
    { id: 5, name: "Anital Smith", age: 23 },
    { id: 6, name: "Michael Kingsley", age: 20 },
];

app.get("/students", (req, res) => {
    res.status(200).json(studentList);
});

app.post("/students", (req, res) => {
    const id = parseInt(studentList.length + 1);
    const newStudent = { id, ...req.body };
    studentList.push(newStudent);
    res.status(201).json(newStudent);
});

app.patch('/students/:id', (req, res) => { 
    const id = parseInt(req.params.id);
    const student = studentList.find(student => student.id === id);
    if(!student) {
        return res.status(404).json({error: "Student not found"});
    };
    Object.assign(student, req.body);
    res.status(200).json(student);
});

app.delete('/students/:id', (req, res) => { 
    const id = parseInt(req.params.id);
    const initialList = studentList.length;
    console.log(initialList)
    const student = studentList.filter((student) => student.id !== id)
    console.log(student)
    if(student.length === initialList) {
        return res.status(404).json({error: "Student not found"});
    }
    res.status(204).send();
});

app.use((err, req, res, next) => {
    res.status(500).json({error: "Internal Server Error"});
});

const PORT = process.env.PORT || 3000
app.listen(PORT,() => { 
    console.log(`Server is running on port ${PORT}`)
})
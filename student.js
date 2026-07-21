const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
let students = [
    {id: 1, name:"Benjamin", course: "cloud computing", age:22},
    {id: 2, name:"Juliet", course: " information technology", age:21},
    {id: 3, name:"Paul", course: "computer science", age:23},
]

app.get("/", (req, res) => {
    res.send("Students Record API");
});


app.get("/students", (req, res) => {res.json(students);
});

app.get("/students/:id", (req, res) => {
    const student = students.find( s=> s.id == req.params.id);
    if (!student) { 
        return res.status(404).json( {message: "Student not found"});
    }
    res.json(student);
});

app.post("/students", (req, res) => {
    const student = { 
        id: students.length + 1,
        name: req.body.name,
        course: req.body.course,
        age: req.body.age
    };

    students.push(student);
    res.status(201).json(student);
});


app.put("/students/:id", (req, res) => {
    const student = students.find(s => s.id == parseInt(req.params.id));
    if (!student) {
        return res.status(404).json( {message: "student not found"});
    }

    student.name = req.body.name;
    student.course = req.body.course;
    student.age = req.body.age;

    res.json(student);
});

app.delete ( "/students/:id", (req, res) => { 
    students = students.filter(s => s.id != parseInt(req.params.id));
    res.json(
        { message: "Student deleted successfully!"});
});

app.listen(PORT, () => {
    console.log(`Server listening to http://localhost:${PORT}`);
});
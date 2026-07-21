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
    res.status(200).json(students);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
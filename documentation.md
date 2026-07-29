# Building a Student Records REST API with Node.js and Express

## Overview

This project demonstrates how to build a simple REST API using Node.js and Express. The API manages an in-memory list of students and supports CRUD operations.

Features include:

- Create students
- Retrieve all students
- Retrieve a student by ID
- Update student records
- Delete student records
- Environment variable support using dotenv
- Error handling middleware
  

## Prerequisites
Before getting started, ensure you have the following installed:

- Visual Studio Code
- Node.js 
- GitHub
- npm (Node Package Manager) is included with Node.js

## Step 1: Initialize a New Node.js Project
Create a new project folder, navigate into it, and run:

```bash
npm init -y
```

This command creates a package.json file that stores your project's configuration and dependencies.

## Step 2: Install Express

Install Express by running: 

```bash
npm install express
```

## Step 3: Create a server

Create a file named  `student-list-manager.js`

Add the following code:

```js
const express = require('express');
const app = express()

// Sample student data (temporary in-memory database)
let students = [
    {
        id: 1,
        name: "Benjamin",
        course: "Cloud Computing",
        age: 22
    }
];

app.get('/', (req, res) => {
  res.send('Students Record API!')
})

const port = 3000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
```


## Step 4: Install nodemon 

```bash
npm install -g nodemon
```

This allows your server to automatically reload when changes are made to `student-list-manager.js`.

Once the package is installed, update the scripts section of your package.json:
```
{
  "scripts": {
    "start": "node student-list-manager.js",
    "dev": "nodemon student-list-manager.js"
  }
}

```
Run the development server for testing purposes:

`npm run dev`

## Step 5: Install dotenv

The dotenv package allows you to store sensitive information such as API keys, database credentials, and tokens in environment variables instead of hardcoding them into your source code.

Install:

```bash
npm install dotenv
```

At the top of `student-list-manager.js`, add:

```js 
require("dotenv").config();
```

Create a `.env` file in the project's root directory:

```env
PORT=add_a_port_number
```

Replace:

`const port = 3000;`

With 

`const port = process.env.PORT || 3000;`

## Step 6: Create a .gitignore file 

This prevents sensitive data from being committed to github

add the following in the file:

```
node_modules/
.env
```

## Step 7: Create endpoints paths

Enable JSON request parsing by adding the following middleware to student-list-manager.js:

`app.use(express.json());`


## GET /students 

### This retreives all students records

Replace 

```js 
app.get('/', (req, res) => {
  res.send('Students Record API!')
})
``` 

with

```js
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
```

## GET /students/:id 

### This returns a student record by ID
```js
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

```

## POST /students

### This creates a new student record to the students array

```js
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
```

## PATCH /students/:id

### This partially updates an existing student record.
```js
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
```

## PUT /students/:id

### This partially applies a full replacement of a student record

```js
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
```


## DELETE /students/:id

### This deletes a student record from the students array
```js
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
```

## Add a middleware to handle json syntax error and Server error

```js
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            message: "Invalid JSON format."
        });
    }

    next(err);
});

app.use((err, req, res, next) => {
    res.status(500).json({ error: "Server error!" });
});

```

Run the server by typing `npm run dev` in your terminal and test the app.

## Step 8: Test the endpoints

Install `Thunder Client` extension on VScode or install `Postman` to test the endpoints. For this documentation we will use Postman. 
Ensure your server is running, then create requests to test each endpoint.

[Postman documentation]()




## Step 9: Intialize Git and Push to Github

Save your changes and ensure you have already created a repository on GitHub.

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```

Replace <your-repository-url> with the URL of your GitHub repository.


require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3200;

app.use(express.json());

//Initial student data
let students =  [
    {
        id : 1,
        firstName : 'Kelly',
        middleName : 'Osas',
        lastName : 'Osatohanmwen',
        age : 20,
        email : 'kellyosasng@gmail.com',
        department : 'Production Engineering'
    },
    {
        id : 2,
        firstName : 'Jane',
        middleName : 'Peter',
        lastName : 'Everton',
        age : 30,
        email : 'janepetereverton@gmail.com',
        department : 'Crop Science'
    },
];

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Student Record API - Group 2C',
        version: '1.0.0',
        endpoints: {
         
            // All GET endpoints for the API
            GET : {
            '/': 'Welcome to the Student Record API - Group 2C',
            '/students': 'Get all students records',
            '/students/:id': 'Get a single student record by ID',
            
         },

         // All POST endpoints for the API
            POST: {
                '/students': 'Add a new student record'
            },
        
        // PUT endpoints for the API
            PUT: {
                '/students/:id': 'Update an entire student record by ID'
            },
        // PATCH endpoints for the API
            PATCH: {
                '/students/:id': 'Partially update a single field of a student record by ID'
            },
        // DELETE endpoints for the API
            DELETE: {
                '/students/:id': 'Delete a student record by ID'
            }
        }
    });
});

// GET all students
app.get('/students', (req, res) => {
    res.status(200).json({
        message: 'All students records retrieved successfully',
        count: students.length,
        data: students 
    });
});

//GET a single student by ID
app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({
            message: `Student with ID ${studentId} not found`
        })
    }
    res.status(200).json({
        message: 'Student record retrieved successfully',
        data: student
    });
});


//POST a new student
app.post('/students', (req, res) => {
    const { firstName, middleName, lastName, age, email, department } = req.body;
    const newStudent = {
        id: students.length + 1,
        firstName,
        middleName,
        lastName,
        age,
        email,
        department
    };

    if (!firstName || !lastName || !age || !email || !department) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields. Please provide firstName, lastName, age, email, and department.'
        });
    }
    students.push(newStudent);
    
    res.status(201).json({
        message : 'New student record created successfully',
        data: newStudent
    })  
});


//PUT a student record by ID
app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const { firstName, middleName, lastName, age, email, department } = req.body;

    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({
            message: `Student with ID ${studentId} not found`
        });
    }

    // Update the student record
    students[studentIndex] = {
        id: studentId,
        firstName,
        middleName,
        lastName,
        age,
        email,
        department
    };

    res.status(200).json({
        message: 'Student record updated successfully',
        data: students[studentIndex]
    });
});

//PATCH a student record by ID
app.patch('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const { firstName, middleName, lastName, age, email, department } = req.body;

    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({
            message: `Student with ID ${studentId} not found`
        });
    }

    // Update only the provided fields
    if (firstName !== undefined) students[studentIndex].firstName = firstName;      // Update firstName if provided
    if (middleName !== undefined) students[studentIndex].middleName = middleName;   // Update middleName if provided
    if (lastName !== undefined) students[studentIndex].lastName = lastName;         // Update lastName if provided
    if (age !== undefined) students[studentIndex].age = age;                        // Update age if provided
    if (email !== undefined) students[studentIndex].email = email;                  // Update email if provided
    if (department !== undefined) students[studentIndex].department = department;   // Update department if provided

    res.status(200).json({
        message: 'Student record updated successfully',
        data: students[studentIndex]
    });
});

//DELETE a student record by ID
app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);                                      // Get the student ID from the request parameters
    const studentIndex = students.findIndex(s => s.id === studentId);               // Find the index of the student record to delete

    if (studentIndex === -1) {                                                      // If the student record is not found, return a 404 error
        return res.status(404).json({
            message: `Student with ID ${studentId} not found`
        });
    }

    // Remove the student record from the array
    const deletedStudent = students.splice(studentIndex, 1);                        // Store the deleted student record in a variable

    res.status(200).json({
        message: 'Student record deleted successfully',
        data: deletedStudent[0]
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
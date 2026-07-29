# Student Record API – Restored Endpoint Prototypes

## Overview

This repository contains a Student Record API built with **Node.js** and **Express.js** to demonstrate CRUD (Create, Read, Update and Delete) operations on student records.

As part of the project's development, standalone prototype files were created for each endpoint before they were integrated into the complete CRUD application. These files have been restored to preserve the project's development history and to provide simple reference implementations for learning, testing and documentation.

The main implementation of the Student Record API remains in **`student-list-manager.js`**.

---

## Restored Prototype Files

### `updated_get_student.js`

A standalone implementation of the **GET** endpoint used to retrieve student records.

**Features**

- Retrieves all student records.
- Returns a success message.
- Returns the total number of students.
- Includes a timestamp for every response.
- Handles empty student lists gracefully.

---

### `updated_post_student.js`

A standalone implementation of the **POST** endpoint used to create new student records.

**Features**

- Creates new student records.
- Validates required input fields.
- Ensures age is a valid positive number.
- Returns appropriate HTTP status codes.
- Provides meaningful validation error messages.

---

### `updated_patch_student.js`

A standalone implementation of the **PATCH** endpoint used for partial updates.

**Features**

- Updates only the fields supplied by the client.
- Preserves existing values for omitted fields.
- Returns an error when the student record cannot be found.
- Returns the updated student record after a successful request.

---

### `updated_put_student.js`

A standalone implementation of the **PUT** endpoint used for full updates.

**Features**

- Replaces an existing student record.
- Requires all fields to be supplied.
- Validates user input.
- Returns appropriate success and error responses.

---

### `updated_delete_student.js`

A standalone implementation of the **DELETE** endpoint used to remove student records.

**Features**

- Deletes a student record using its ID.
- Returns a confirmation message after successful deletion.
- Returns an error if the student record does not exist.

---

## Project Structure

```
student-record-api/
│
├── student-list-manager.js        # Main CRUD API implementation
├── updated_get_student.js         # GET endpoint prototype
├── updated_post_student.js        # POST endpoint prototype
├── updated_patch_student.js       # PATCH endpoint prototype
├── updated_put_student.js         # PUT endpoint prototype
├── updated_delete_student.js      # DELETE endpoint prototype
├── package.json
├── package-lock.json
└── README.md
```

---

## Technologies Used

- Node.js
- Express.js
- JavaScript
- Git & GitHub
- Postman (API testing)

---

## Running the Project

### Clone the repository

```bash
git clone <repository-url>
```

### Install dependencies

```bash
npm install
```

### Start the server

```bash
node student-list-manager.js
```

or

```bash
npm start
```

---

## API Endpoints

| Method | Endpoint | Description |
| --------- | ---------- | ------------- |
| GET | `/students` | Retrieve all students |
| POST | `/students` | Create a new student |
| PATCH | `/students/:id` | Partially update a student |
| PUT | `/students/:id` | Fully update a student |
| DELETE | `/students/:id` | Delete a student |

---

## Purpose of the Restored Files

The restored endpoint prototype files were included to:

- Preserve the project's development history.
- Demonstrate how each CRUD endpoint was implemented individually.
- Provide reference implementations for students learning Express.js.
- Serve as documentation for future contributors.
- Make testing individual endpoints easier during development.

---

## Note

The standalone endpoint files are **reference implementations** and are maintained alongside the main application for educational and documentation purposes.

The complete and recommended implementation of the Student Record API is contained in **`student-list-manager.js`**.

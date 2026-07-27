# Student Record API - Group 2C

Developing an API to manage a list of students. Implement endpoints to add, view, edit and remove students records.

## Expected Deliverables -

- Express.js API implementing CRUD operations.
- GitHub repository with commits from all members.
- Postman collection for testing endpoints.
- Powerpoint or Google slides presentation explaining the project.
- Live demo (via localhost or deployment) during presentation week.

## My Improvements

### GET Endpoint

I enhanced the GET endpoint by making the response more informative. Instead of returning only the student array, I included a success message, the total number of student records, and a timestamp indicating when the response was generated. I also handled the case where no students exist by returning a clear message and a count of zero. These changes make the API easier for clients to understand and consume.

Returns all students.

Response includes:

- message
- total number of students
- timestamp
- student list

If there are no students, it returns:

```json
{
  "message": "No students found.",
  "count": 0,
  "timestamp": "2026-07-21T00:00:00.000Z",
  "students": []
}

### POST Endpoint

- I improved the POST endpoint by adding server-side validation before creating a student record. The endpoint checks that all required fields are present and ensures the age is a valid positive number. If the validation fails, it returns a 400 Bad Request with a clear error message. If the request is valid, it creates the student and returns a 201 Created response.

- I added a middleware to check for invalid JSON inputs during testing.


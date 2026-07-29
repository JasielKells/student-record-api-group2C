// Update one student by ID (partial update)
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

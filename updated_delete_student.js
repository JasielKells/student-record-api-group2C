// Delete one student by ID
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

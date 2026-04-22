const Student = require("../models/Student");

// CREATE
const addStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
};

// GET
const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// UPDATE
const updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(student);
};

// DELETE
const deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

module.exports = {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
};
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  subject1: Number,
  subject2: Number,
  subject3: Number,
  subject4: Number,
  subject5: Number,
});

// Prevent overwrite error
const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

module.exports = Student;
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  subject1: Number,
  subject2: Number,
  subject3: Number,
  subject4: Number,
  subject5: Number
});

export default mongoose.model("Student", studentSchema);
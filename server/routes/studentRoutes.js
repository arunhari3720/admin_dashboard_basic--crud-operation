import express from "express";
import {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", addStudent);
router.get("/", getStudents);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
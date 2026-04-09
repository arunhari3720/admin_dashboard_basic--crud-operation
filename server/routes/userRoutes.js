import express from "express";
import { registerUser,getUsers,updateUser,deleteUser } from "../controllers/userController.js";
import upload from "../middleware/upload.js";


const router = express.Router();

router.post("/register", registerUser);
router.get("/",getUsers);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser)
router.post("/register", upload.single("image"), registerUser);
export default router;
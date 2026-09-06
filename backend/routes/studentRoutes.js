const express = require("express");

const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create student
router.post("/", protect, createStudent);

// Get all students
router.get("/", protect, getAllStudents);

// Get single student
router.get("/:id", protect, getStudentById);

// Update student
router.put("/:id", protect, updateStudent);

// Delete student
router.delete("/:id", protect, deleteStudent);

module.exports = router;
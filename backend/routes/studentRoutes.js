const express = require("express");

const {
    createStudent
} = require("../controllers/studentController");

const router = express.Router();

// Create student
router.post("/", createStudent);

module.exports = router;
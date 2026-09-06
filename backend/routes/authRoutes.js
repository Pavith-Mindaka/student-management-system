const express = require("express");

const {
    registerAdmin,
    loginAdmin
} = require("../controllers/authController");

const router = express.Router();

// Register Admin
router.post("/register", registerAdmin);

// Login
router.post("/login", loginAdmin);

module.exports = router;
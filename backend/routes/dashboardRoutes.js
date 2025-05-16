const express = require("express");
const {protect} = require("../middleware/authMiddleware")
const {
    getDashboardData,
} = require("../controllers/dashboardController");

const router = express.Router(); // Creates a router object

router.get("/", protect, getDashboardData);

module.exports = router;
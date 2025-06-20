const express = require('express');
const {
    getLove,
    updateLove,
} = require("../controllers/loveController");

const router = express.Router();

router.get("/get", getLove);
router.post("/toggle", updateLove);

module.exports = router;
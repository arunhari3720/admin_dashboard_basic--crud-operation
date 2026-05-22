const express = require("express");
const { getFinalPrice } = require("../controllers/priceController");

const router = express.Router();

// GET final price for a car
router.get("/:carId", getFinalPrice);

module.exports = router;
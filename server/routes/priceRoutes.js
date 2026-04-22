// routes/priceRoutes.js
const express = require("express");
const { getFinalPrice } = require("../controllers/priceController");

const router = express.Router();

router.get("/:carId", getFinalPrice);

module.exports = router;
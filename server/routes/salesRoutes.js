const express = require("express");
const {
  getDailySales,
  getMonthlySales,
} = require("../controllers/salesController");

const router = express.Router();

router.get("/daily-sales", getDailySales);
router.get("/monthly-sales", getMonthlySales);

module.exports = router;
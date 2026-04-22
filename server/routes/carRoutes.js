const express = require("express");
const {
  createCar,
  getCars,
  updateCar,
  deleteCar,
  updateCarDiscount,
  updateBulkDiscount,
} = require("../controllers/carController");

const router = express.Router();

// Specific routes FIRST
router.put("/bulk-discount", updateBulkDiscount);
router.put("/discount/:carId", updateCarDiscount);

// General routes AFTER
router.post("/", createCar);
router.get("/", getCars);
router.put("/:carId", updateCar);
router.delete("/:carId", deleteCar);

module.exports = router;
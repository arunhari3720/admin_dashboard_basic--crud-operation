const express = require("express");
const Bike = require("../models/Bike");

const router = express.Router();

// GET with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const skip = (page - 1) * limit;

    const total = await Bike.countDocuments();
    const bikes = await Bike.find().skip(skip).limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data: bikes,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
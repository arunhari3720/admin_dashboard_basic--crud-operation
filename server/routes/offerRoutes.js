const express = require("express");
const { createOffer, getOffers } = require("../controllers/offerController");

const router = express.Router();

router.post("/", createOffer);
router.get("/", getOffers);

module.exports = router;
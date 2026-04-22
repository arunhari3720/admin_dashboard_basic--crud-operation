const express = require("express");
const upload = require("../middleware/upload");
const { uploadLogo, getLogo } = require("../controllers/logoController");

const router = express.Router();

router.post("/upload", upload.single("logo"), uploadLogo);
router.get("/get", getLogo);

module.exports = router;
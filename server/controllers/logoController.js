const cloudinary = require("../config/cloudinary");
const Settings = require("../models/Settings");

// helper: upload buffer to cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "logos" }, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      })
      .end(buffer);
  });
};

const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload new logo
    const result = await uploadToCloudinary(req.file.buffer);

    // Get old logo
    const existing = await Settings.findOne();

    // Delete old logo (optional)
    if (existing?.logo) {
      const publicId = existing.logo
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];

      await cloudinary.uploader.destroy(publicId);
    }

    // Save new logo
    const updated = await Settings.findOneAndUpdate(
      {},
      { logo: result.secure_url },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Logo uploaded successfully",
      data: updated,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};

const getLogo = async (req, res) => {
  try {
    const data = await Settings.findOne();
    res.json({ logo: data?.logo || "" });
  } catch (err) {
    res.status(500).json({ message: "Error fetching logo" });
  }
};

module.exports = {
  uploadLogo,
  getLogo,
};
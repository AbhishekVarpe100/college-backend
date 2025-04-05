const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Storage
const storage3 = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Blog_Images", // Cloudinary folder name
    format: async (req, file) => file.mimetype.split("/")[1], // Extract format dynamically
    public_id: (req, file) => file.fieldname + "_" + Date.now(),
  },
});

module.exports = { cloudinary, storage3 };

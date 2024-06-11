// controllers/fileController.js
const multer = require('multer');
const path = require('path');
const File = require('../models/File');

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|mp4|mp3/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Middleware to handle file upload
exports.uploadMiddleware = upload.single('file');

// Controller to handle file upload
exports.uploadFile = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a file' });
    }

    // Create a new File instance
    const newFile = new File({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      user: req.user._id  // Assuming you have implemented authentication
    });

    // Save the file to MongoDB
    await newFile.save();

    // Send success response
    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
};


// Controller to delete a file by ID
exports.deleteFileById = async (req, res) => {
  const fileId = req.params.id;

  try {
    const deletedFile = await File.deleteFileById(fileId);
    if (!deletedFile) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.status(200).json({ message: 'File deleted successfully', file: deletedFile });
  } catch (error) {
    console.error('File delete error:', error);
    res.status(500).json({ error: 'File delete failed' });
  }
};


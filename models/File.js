// models/File.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  filename: String,
  contentType: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'  // Assuming you have a User model
  }
});

// Method to delete a file by ID
fileSchema.statics.deleteFileById = async function(fileId) {
  try {
    const file = await this.findById(fileId);
    if (!file) {
      throw new Error('File not found');
    }
    await file.deleteOne(); // Use `remove()` method to remove the document
    return file;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('File', fileSchema);

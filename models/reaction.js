const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  reactionText: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define a getter method to format the timestamp
reactionSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toLocaleString(); 
});

module.exports = reactionSchema;

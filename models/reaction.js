const mongoose = require('mongoose');
const { Schema, Types } = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
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

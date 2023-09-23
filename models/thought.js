const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    }
)

// Define a getter method to format the timestamp
thoughtSchema.virtual('formattedCreatedAt').get(function () {
    return this.createdAt.toLocaleString(); 
  });

// Define a virtual 'reactionCount'
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
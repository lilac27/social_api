const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const { model: Thought } = require('./Thought');


const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,            
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 
        },
        thoughts: [{
            type: Schema.Types.ObjectId, 
            ref: 'Thought', 
          }],    
        friends: [{
            type: Schema.Types.ObjectId, 
            ref: 'User',
        }],
        });

        userSchema.virtual('friendCount').get(function() {
            return this.friends.length;
          });
          
          const User = mongoose.model('User', userSchema);
          
          module.exports = User;
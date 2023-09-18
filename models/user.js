const { Schema, model } = require('mongoose');


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
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'thought', 
          }],    
        friends: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'user',
        }],
        });

        userSchema.virtual('friendCount').get(function() {
            return this.friends.length;
          });
          
          const User = mongoose.model('user', userSchema);
          
          module.exports = user;
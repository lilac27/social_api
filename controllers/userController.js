const { ObjectId } = require('mongoose').Types;
const { Reaction, Thought, User } = require('../models');

module.exports = {
    //get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } 
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //get single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({
                _id: req.params.userId })
                .select('-__v')
                .populate('thoughts')
                .populate('friends');

                if (!user) {
                    return res.status(404).json({
                        message: 'No user with that ID'
                    })
                }
                res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },
    //create new user
    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      //update a user
      async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }
            res.json({ message: 'User successfully updated' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err); 
        }
      },
      //delete a user
      async deleteUser(req,res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }
            res.json({ message: 'User successfully deleted' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err); 
        }},

        async addFriend(req, res) {
          try {
            const { userId } = req.params;
            const { friendId } = req.body;
      
            // Find the user by their ID
            const user = await User.findById(userId);
      
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
      
            // Check if the friendId is already in the user's friends list to avoid duplicates
            if (user.friends.includes(friendId)) {
              return res.status(400).json({ message: 'Friend already exists' });
            }
      
            // Add the friendId to the user's friends list
            user.friends.push(friendId);
      
            // Save the user with the updated friends list
            await user.save();
      
            res.status(201).json(user);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding friend' });
          }
        },
        async removeFriend(req, res) {
          try {
            const { userId, friendId } = req.params;
      
            // Find the user by their ID
            const user = await User.findById(userId);
      
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
      
            // Check if the friendId exists in the user's friends list
            const friendIndex = user.friends.indexOf(friendId);
      
            if (friendIndex === -1) {
              return res.status(404).json({ message: 'Friend not found in the user\'s list' });
            }
      
            // Remove the friendId from the user's friends list
            user.friends.splice(friendIndex, 1);
      
            // Save the user with the updated friends list
            await user.save();
      
            res.status(200).json(user);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error removing friend' });
          }
        },
      };
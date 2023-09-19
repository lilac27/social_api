const { ObjectId } = require('mongoose').Types;
const { Reaction, Thought, User } = require('../models');

module.exports = {
    //get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
        } catch (err) {
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
        }
      },
}
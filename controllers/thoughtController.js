const { ObjectId } = require('mongoose').Types;
const { Reaction, Thought, User } = require('../models');
const reactionSchema = require('../')

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //get single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({
                _id: req.params.thoughtId })
                .select('-__v')
                .populate('thoughts')
                .populate('friends');

                if (!thought) {
                    return res.status(404).json({
                        message: 'No thought with that ID'
                    })
                }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },
    //create new thought
    async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      //update a thought
      async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No such thought exists' });
            }
            res.json({ message: 'Thought successfully updated' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err); 
        }
      },
      //delete a thought
      async deleteThought(req,res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No such thought exists' });
            }
            res.json({ message: 'Thought successfully deleted' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err); 
        }
      },



      async addReaction(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async removeReaction(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    };
const { ObjectId } = require('mongoose').Types;
const { Reaction, Thought, User } = require('../models');

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
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

  createReaction(req, res) {
    const { thoughtId } = req.params;
    const { reactionText } = req.body;

    // Find the thought by its ID
    Thought.findById(thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }

        // Create the reaction and add it to the thought's reactions array
        thought.reactions.push({ reactionText });
        return thought.save();
      })
      .then((thoughtWithReaction) => {
        res.status(201).json(thoughtWithReaction);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error creating reaction' });
      });
  },

  removeReaction(req, res) {
    const { thoughtId, reactionId } = req.params;

    // Find the thought by its ID
    Thought.findById(thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }

        // Find and remove the reaction by its ID
        const reactionIndex = thought.reactions.findIndex(
          (reaction) => reaction._id == reactionId
        );
        if (reactionIndex === -1) {
          return res.status(404).json({ message: 'Reaction not found' });
        }

        thought.reactions.splice(reactionIndex, 1);
        return thought.save();
      })
      .then((thoughtWithUpdatedReactions) => {
        res.status(200).json(thoughtWithUpdatedReactions);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Error removing reaction' });
      });
  },
};
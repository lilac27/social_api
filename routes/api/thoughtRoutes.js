// routes/thoughtRoutes.js
const express = require('express');
const router = express.Router();
const thoughtController = require('../controllers/thoughtController');

router.get('/', thoughtController.getAllThoughts);
router.get('/:thoughtId', thoughtController.getSingleThought);
router.post('/', thoughtController.createThought);
router.put('/:thoughtId', thoughtController.updateThought);
router.delete('/:thoughtId', thoughtController.deleteThought);

// Include routes for handling reactions within the thought routes
router.post('/:thoughtId/reactions', thoughtController.createReaction);
router.delete('/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);

// Create a reaction for a thought
router.post('/:thoughtId/reactions', thoughtController.createReaction);

// Remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);


module.exports = router;
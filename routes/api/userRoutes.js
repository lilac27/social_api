// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/', userController.getUsers);
router.get('/:userId', userController.getSingleUser);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

// Include routes for handling friends within the user routes
router.post('/:userId/friends/:friendId', userController.addFriend);
router.delete('/:userId/friends/:friendId', userController.removeFriend);

module.exports = router;
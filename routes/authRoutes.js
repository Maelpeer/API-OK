const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/authController');

router.post('/register', authController.registerUser);
router.post('/authenticate', authController.authenticateUser);
router.put('/update/:id', authController.updateUser);
router.post('/sendNotification/:id', authController.sendNotification);


module.exports = router;
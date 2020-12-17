// Routes for logging a user 
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');
const auth = require('../middleware/auth');

// Login
router.post('/',
    authController.loginUsers
);

// logged in user
router.get('/',
    auth,
    authController.loggedinUser
)

module.exports = router;
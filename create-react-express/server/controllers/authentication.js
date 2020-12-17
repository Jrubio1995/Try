const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.loginUsers = async (req, res) => {
    // checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // get email and password
    const { email, password } = req.body;
    try {
        // check if is registered user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User Is Not registered' });
        }
        // check password
        const correctPass = await bcryptjs.compare(password, user.password)
        if (!correctPass) {
            return res.status(400).json({ msg: "Incorrect Password Entered" })
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, "secret", {
            // Timer
            //expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
    }
}

// get the login user
exports.loggedinUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error found.' })
    }
}
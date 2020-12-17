const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    // checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // get email and password
    const { email, password } = req.body;
    try {
        // check for excitting users in database 
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'This User Already Exists.' });
        }

        // creating a user
        user = new User(req.body);

        // hashed password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // user saved
        await user.save();

        // JsonWebToken
        const payload = {
            user: {
                id: user.id
            }
        };
        // sign the JWT
        jwt.sign(payload, process.env.SECRET, {
            // Timer
            expiresIn: 7200
        }, (error, token) => {
            if (error) throw error;
            res.json({ token });
        });
    } catch (error) {
        console.log(error);
        res.status(400).send('Error');
    }
}
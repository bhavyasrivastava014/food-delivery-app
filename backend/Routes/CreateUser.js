const express = require('express')
const User = require('../model/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.JWT_SECRET || "fallback-development-secret-key-change-in-production"

router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 6 }),
    body('password').isLength({ min: 5 }).isAlphanumeric()],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                name: req.body.name,
                password: secPassword ,
                email: req.body.email,
                location: req.body.geolocation
            })
            if (global.logger) global.logger.info(`New user created: ${req.body.email}`);
            res.json({ success: true });
        } catch (error) {
            if (global.logger) global.logger.error('Error creating user:', error);
            res.status(500).json({ success: false, message: 'Error creating user' });
        }
    })

router.post("/loginuser", 
    body('name').isLength({ min: 6 }),
    body('password').isLength({ min: 5 }).isAlphanumeric(),
     async (req, res) => {
        let email = req.body.email
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials." })
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging with correct credentials." })
            }

            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken: authToken })
        } catch (error) {
            if (global.logger) global.logger.error('Error during login:', error);
            res.status(500).json({ success: false, message: 'Server error during login' });
        }
    })

module.exports = router;

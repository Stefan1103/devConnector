const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//express-validator docs od express
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route           POST api/users
// @description     Register user
// @access          Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;
		try {
			// see if user exists
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
			}
			//Get users gravatar
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});
			//create instance of new user
			user = new User({
				name,
				email,
				avatar,
				password
			});
			//Encrypt password
			const salt = bcrypt.genSaltSync(10);
			user.password = bcrypt.hashSync(password, salt);
			await user.save(); // zacuvaj go userot u bazata

			//Return jsonwebtoken
			const payload = {
				user: {
					id: user._id
				}
			};
			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;

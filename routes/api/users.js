const express = require('express');
const router = express.Router();
const issueJwt = require('../../utils/issueJwt');

const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { body, validationResult } = require('express-validator');

// Models
const { User } = require('../../models/index');

/*
 * @route 	POST api/users
 * @desc 	Register New User
 * @access 	Public
 */

router.post(
  '/',
  [
    // name is required
    body('name').notEmpty().withMessage('Name is required'),
    // email must be an email
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please include a valid email'),
    // password must be at least 5 chars long
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure
    const { name, email, password } = req.body;

    try {
      // Check if user exist
      let user = await User.findOne({ where: { email } });

      // If user is actually found
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User is already exists' }] });
      }

      // Gets users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      const newUser = {
        name,
        email,
        password,
        avatar,
      };

      // Encyrpt the password using bcrypt
      const salt = await bcrypt.genSalt(10);

      // Overwrite password from user object and encrypt
      newUser.password = await bcrypt.hash(password, salt);

      // Create new user
      const createUser = await User.create(newUser); // Returns user and promise

      const jwt = issueJwt(createUser);

      // Issue a jwt token
      res.json({ success: true, token: jwt.token, expiresIn: jwt.expires });
    } catch (error) {
      console.error(error);

      res.status(500).json('Server Error'); // Return a response of status 500
    }
  }
);

module.exports = router;

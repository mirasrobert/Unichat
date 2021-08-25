const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');
const { User } = require('../../models/index');

const issueJwt = require('../../utils/issueJwt');
const auth = passport.authenticate('jwt', { session: false });
/*
 * @route 	GET api/auth
 * @desc 	Get the authenticated user
 * @access 	Public
 * @protected-route    auth middleware
 */
router.get('/', auth, async (req, res) => {
  // If user has verified token from middleware 'auth'
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    // Return response of user json
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/*
 * @route 	POST api/auth
 * @desc 	Authenticate User and Get token -- LOGIN
 * @access 	Public
 */
router.post(
  '/',
  [
    body('email')
      .isEmail()
      .withMessage('Please include a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req); // Returns validation error object
    // Check for validation errors
    if (!errors.isEmpty()) {
      // Return status of 400 and response with array of errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure
    const { email, password } = req.body;

    try {
      // Check if user email exist
      let user = await User.findOne({ where: { email } });

      // If user is NOT found or Wrong Email
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] }); // Return error to the client
      }

      /*
       * IF USER HAS BEEN FOUND
       */

      // Check if encrypted password from database is match
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] }); // Return error to the client
      }

      const jwt = issueJwt(user); // Issue a jwt token

      // Issue a jwt token
      res.json({ success: true, token: jwt.token, expiresIn: jwt.expires });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error'); // Return a response of status 500
    }
  }
);

module.exports = router;

const JwtStrategy = require('passport-jwt').Strategy; // Type of passport strategy
const ExtractJwt = require('passport-jwt').ExtractJwt; // Extract the jwt from http header
const fs = require('fs');
const path = require('path');

// Model
const { User } = require('../models/index');

/* Get the key for JWT Secret key
 * If key is not present then, run the generatekeypair.js on utils folder
 * PUB_KEY is for verification and PRIV_KEY is for JWT issuing.
 */
const pathToKey = path.join(__dirname, '..', 'config', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

const strategy = new JwtStrategy(options, async(payload, done) => {
	try {

		const user = await User.findOne({ where: {id: payload.user.id} });
		
		// if there is no user 
		// No Errors but no user
		if(!user) {
			return done(null, false)
		}

		// No errors and have user
		done(null, user);

		
	} catch (error) {
		console.error(error.message);

		done(error, null); // Error	
	}
});

module.exports = (passport) => {
	passport.use(strategy);
};

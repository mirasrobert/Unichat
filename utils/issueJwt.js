const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'config', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
/**
 * @param {*} user - The user object.  We need this to set the JWT `user` payload property to the MongoDB user ID
 */

const issueJWT = (user) => {
  
  const expiresIn = 3600; // Token expiration

  const payload = {
    // Payload to store
    user: {
      id: user.id,
    }
  };

  const options = {
    expiresIn: expiresIn,
    algorithm: 'RS256',
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, options);

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  };
};

module.exports = issueJWT; // Export function

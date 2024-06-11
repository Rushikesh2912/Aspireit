//importing required modules
const passport = require('passport');

//verifying authorization

module.exports.ensureAuth = passport.authenticate('jwt', { session: false });

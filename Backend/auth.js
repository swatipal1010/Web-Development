const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SignUp = require('./models/SignUp');

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await SignUp.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user); // Authentication successful
    } catch (err) {
        return done(err);
    }
}));

module.exports = passport;

//Set up Passport with local authentication strategy, using the SignUp model

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;         //username and passsword strategy
const SignUp = require('./models/SignUp');



passport.use(new LocalStrategy(async(USERNAME, password, done)=>{
  //authentication logic here
  try{
    //console.log('Received credentials:',USERNAME, password);
    const user = await SignUp.findOne({username: USERNAME});
    if(!user)
      return done(null, false, {message:'Incorrect username'});
    const isPasswordMatch = user.comparePassword(password);
    if(isPasswordMatch){
      return done(null, user);
    }else{
      return done(null, false, {message:'Incorrect Password.'})
    }
  }
  catch(err){
    return done(err);
  }
}))

module.exports = passport;                                              //Export configured passport


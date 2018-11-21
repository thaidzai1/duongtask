const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User');

//GOOGLE OAUTH STRATEGY
// passport.use('googleToken', new GooglePlusTokenStrategy({
//   clientID: '802007353549-v3ul9p7n8rqbvqtchglvmng2jfuoo725.apps.googleusercontent.com',
//   clientSecret: 'qmcwuKEUDsM-nLPhw8VXa5cQ',
//   callbackURL: 'oauth/google/callback'
// }, async (accessToken, refreshToken, profile, done) => {
//   try{
//     // console.log(accessToken);
//     // console.log('re', refreshToken);
//     // console.log('prof', profile);
//
//     //check whether this current user exists in our db
//     const existingUser = await User.findOne({"google.id": profile.id});
//     if(existingUser){
//       return done(null, existingUser);
//     }
//
//     //If new account
//     const newUser = new User({
//       google: {
//         id: profile.id,
//         email: profile.emails[0].value
//       },
//       username: profile.username
//     });
//
//     await newUser.save();
//     done(null, newUser);
//   }
//   catch(err){
//     done(err, false, err.message);
//   }
//
// }))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

passport.use( goolge = new GoogleStrategy({
    clientID: '802007353549-v3ul9p7n8rqbvqtchglvmng2jfuoo725.apps.googleusercontent.com',
    clientSecret: 'qmcwuKEUDsM-nLPhw8VXa5cQ',
    callbackURL: '/api/oauth/google/callback'
  }, async (token, tokenSecret, profile, done) => {
    try{
      console.log('profile', profile);
      let existingUser = await User.findOne({'google.id': profile.id});
      if(existingUser){
        return done(null, existingUser);
      }

      const newUser = User({
        google: {
          id: profile.id,
          email: profile.emails[0].value
        },
        username: profile.name.givenName
      })

      console.log(newUser);

      await newUser.save();
      done(null, newUser);
    }
    catch(err){
      done(err, false, err.message);
    }
  })
)

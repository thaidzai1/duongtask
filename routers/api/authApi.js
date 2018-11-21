const routers = require('express').Router();
const passport = require('passport');

const conf_Passport = require('../../config/passport');
const authController = require('../../controllers/api/authController');
const authMiddleware = require('../../middlewares/authMiddlewares');
const googlePassport = passport.authenticate('google', {session: false});

routers.post('/signup', authMiddleware.signUpValidate, authMiddleware.EmailisExisted, authController.postSignup);

routers.post('/login', authMiddleware.loginValidate, authController.postLogin);

routers.get('/logout', authController.getLogout);

// routers.post('/oauth/google', googlePassport, authController.googleOAuth);

routers.get('/oauth/google', passport.authenticate('google', {scope: [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
]}));

routers.get('/oauth/google/callback', googlePassport, authController.googleOAuth);

routers.get('/checkSession', authMiddleware.checkAuth, authController.checkSession);

routers.get('/test', authMiddleware.checkAuth, (req, res) => {
  res.json({
    message: 'hello'
  });
});

module.exports = routers;

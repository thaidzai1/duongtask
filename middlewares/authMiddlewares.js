const { check } = require('express-validator/check');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const keys = require('../config/keys');

module.exports = {
  signUpValidate(req, res, next){
    req.check('email', 'Invalid Email address').isEmail();
    req.check('username', 'Your name is required').isLength({ min: 1});
    req.check('password', 'Password is required at least 6 chars long').isLength({ min: 6});
    req.check('conf_pass', 'Confirmation is not successful').equals(req.body.password);
    req.check('tel', 'Tel is required').isLength({min:1});
    let errors =   req.validationErrors();
    if(errors){
      return res.status(403).json({
        message: [...errors]
      })
    }
    next();
  },

  async EmailisExisted(req, res, next) {
    let user = await User.findOne({email: req.body.email});
    if(user !== null){
      return res.status(403).json({
        message: [{param: 'email', msg: 'Email is existed'}]
      });
    }
    next();
  },

  loginValidate(req, res, next){
    req.check('email', 'Invalid Email adress').isEmail();
    req.check('password', 'Password is required').isLength({ min: 1});
    let errors = req.validationErrors();
    if(errors){
      return res.status(401).json({
        message: [...errors]
      });
    }
    next();
  },

  checkAuth(req, res, next){
    try{
      const token = req.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, keys.jwt);
      next();
    }
    catch(err){
      return res.status(401).json({
        authen: false
      });
    }
  }
}

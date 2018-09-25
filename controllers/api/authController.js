const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const keys = require('../../config/keys');

module.exports = {
  async postSignup(req, res, next){
    const newUser = new User();
    newUser.email = req.body.email;
    newUser.password = newUser.generateHash(req.body.password);
    newUser.username = req.body.username;
    newUser.tel = req.body.tel;
    let success = await newUser.save();
    return res.status(200).json({
      message: false
    })
  },

  async postLogin(req, res, next){
    const user = await User.findOne({email: req.body.email});
    if(!user){
      return res.status(401).json({
        message: [{ msg: 'Email is incorrect', param: 'email'}]
      });
    }
    if(!user.validatePass(req.body.password)){
      return res.status(401).json({
        message: [{msg: 'Password is wrong', param: 'password'}]
      });
    }
    const token = jwt.sign({
        email: user.email,
        username: user.username,
        userId: user._id
      },
        keys.jwt,
      {
        expiresIn: "24h"
      }
    );
    return res.status(200).json({
      email: user.email,
      username: user.username,
      userId: user._id,
      token
    });
  },

  getLogout(req, res, next){
    return res.status(200).json({
      authen: false
    })
  },

  async googleOAuth(req, res, next){
    //Generate token
    console.log('req.user',req.user);
    const token = await jwt.sign({
        emai: req.user.google.email,
        userId: req.user._id,
        google_id: req.user.google.id,
        username: req.user.username
      },
      keys.jwt,
      {
        expiresIn: "24h"
      }
    );

    return res.status(200).json({
      emai: req.user.google.email,
      userId: req.user._id,
      google_id: req.user.google.id,
      username: req.user.username,
      token
    });
  },

  checkSession(req, res, next){
    return res.status(200).json({authen: true})
  },

}

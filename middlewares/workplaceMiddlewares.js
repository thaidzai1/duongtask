const { check } = require('express-validator/check');

const Box = require('../models/Box');

module.exports = {
  createBoxValidation(req, res, next){
    req.check('name', "Box's name is requried").isLength({ min: 1});
    const errors = req.validationErrors();
    if(errors){
      return res.status(404).json({errors});
    }
    next()
  },

  updateBoxValidation(req, res, next){
    req.check('name', "Box's name is requried").isLength({ min: 1});
    const errors = req.validationErrors();
    if(errors){
      return res.status(404).json({errors});
    }
    next()
  },

  createItemValidation(req, res, next){
    req.check('name', "Item's name is required").isLength({ min: 1});
    req.check('parent', "Item's parent box is required").isLength({ min: 1});
    const errors = req.validationErrors();
    if(errors){
      return res.status(404).json(errors);
    }
    next();
  },

  updateItemValidation(req, res, next){
    req.check('name', "Item's name is required").isLength({ min: 1});
    req.check('parent', "Item's parent box is required").isLength({ min: 1});
    const errors = req.validationErrors();
    if(errors){
      return res.status(404).json(errors);
    }
    next();
  }
}

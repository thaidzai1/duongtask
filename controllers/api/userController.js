const User = require('../../models/User');

module.exports = {
  getUserWithID(req, res, next){
    User.findById(req.params.id).then(user => {
      return res.status(200).json({user});
    }).catch(err => {
      console.log(err);
      return res.status(404).json({err});
    })
  }
}

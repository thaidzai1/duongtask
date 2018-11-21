const Room = require('../../models/Room');

module.exports = {
  async getRoomMessages(req, res, next){
    let room = await Room.findOne({_id: req.params.room_id}).select({chat: 1, _id: 0, user_1: 0, user_2: 0}).where('chat').slice(-10);
    return res.status(200).json(room);
  },

  async NewMessages(req, res, next){
    let room = await Room.findOne({_id: req.params.room_id}).select({chat: 1, user_1: 0, user_2: 0}).where('chat').slice(0);
    room.chat.push({
      message: req.body.message,
      user_id: req.body.user_id
    });
    room.save();
    return res.status(200).json(room);
  }
}

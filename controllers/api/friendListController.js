var fs = require('fs');

const FriendList = require('../../models/FriendList');
const User = require('../../models/User');
const Room = require('../../models/Room');

module.exports = {
  addJSONFriend(req, res, next){
    fs.readFile('./models/data/FriendList/' + req.params.user_id+ '.json', (err, data) => {
      if(!err){
        let obj = JSON.parse(data);
        obj.friendList.push({id: req.params.friend_id});
        fs.writeFile('./models/data/FriendList/' + req.params.user_id + '.json', JSON.stringify(obj));
      }
      else{
        let obj = {
          friendList: []
        };
        obj.friendList.push({id: req.params.friend_id});
        var json = JSON.stringify(obj)
        fs.writeFile('./models/data/FriendList/' + req.params.user_id + '.json', json);
      }
    })
    // fs.appendFile('./models/data/FriendList/' + req.params.user_id+ '.json', req.params.friend_id, err => {
    //   if(err){
    //     fs.writeFile('./models/data/FriendList/' + req.params.user_id + '.json', req.params.friend_id);
    //   }
    // });
    res.json(req.params);
  },

  async addFriend(req, res, next){
    //add friend for both user
    await bothAddFriend(req.params.friend_id, req.params.user_id);
    res.json(await bothAddFriend(req.params.user_id, req.params.friend_id));
    //create chat room for both user
    createRoom(req.params.user_id, req.params.friend_id);
  },

  async listFriends(req, res, next){
    //lean: provide developer can add property in to mongo object
    //check User has friend list yet ?
    let friends = await FriendList.findOne({user_id: req.params.user_id}).lean();

    //had friend list
    if(friends !== null){
      //get friend's username
      const promise = friends.list.map(async friend => {
        let user = await User.findById(friend.friend_id);
        return friend.username = user.username;
      });

      //wait all promise async await finish
      await Promise.all(promise);

      return res.status(200).json({
        success: true,
        friendList: friends
      });
    }
    else{
      return res.status(404).json({
        message: 'Not found',
        success: false
      })
    }
  },

  async getRoom(req, res, next){
    let user_1 = req.params.user_id;
    let user_2 = req.params.friend_id;
    //get all room of user_1
    let rooms = await Room.find().or([{user_1: user_1}, {user_2: user_1}]).select({chat: 0});
    console.log(rooms);
    //find room of user_1 and user_2
    for(let room of rooms){
      if(room.user_2 === user_2 || room.user_1 === user_2){
        return res.json({room});
      }
    }

    return res.json({
      message: 'not found'
    });
  },

  async getUserRooms(req, res, next){
    let rooms = await Room.find({$or: [{user_1: req.params.user_id}, {user_2: req.params.user_id}]});

    if(rooms){
      return res.status(200).json({rooms});
    }

    return res.status(404).json({rooms});
  },

  async autoAddFriend(first_user, second_user){
    //add friend for both user
    await bothAddFriend(first_user, second_user);
    await bothAddFriend(second_user, first_user);
    // res.json(await bothAddFriend(req.params.user_id, req.params.friend_id));
    //create chat room for both user
    createRoom(first_user, second_user);
  }
}

async function bothAddFriend(first_user, second_user){
  //check user friend list created or not?
  let existed_list = await FriendList.findOne({user_id: first_user});

  //true
  if(existed_list !== null){
    //check friend is added or not ?
    let was_friend = existed_list.list.filter(friend => friend.friend_id === second_user);

    //true
    if(was_friend.length > 0){
      return{
        message: 'friend already',
        success: false
      }
    }
    else{
      //add that friend
      existed_list.list.push({friend_id: second_user});
      try{
        await existed_list.save();
      }
      catch(err){
        return {
          err,
          status: false
        }
      }
      return{
        success: true,
        friend: existed_list
      }
    }
  }

  //user do not have friend list
  const friend = new FriendList();
  friend.user_id = first_user;
  friend.list.push({friend_id: second_user});
  try{
    await friend.save();
  }
  catch(err){
    return err;
  }
  return {
    success: true,
    friend
  };
}

async function createRoom(first_user, second_user){
  const newRoom = new Room({
    user_1: first_user,
    user_2: second_user
  });
  await newRoom.save();
}

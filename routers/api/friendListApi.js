const routers = require('express').Router();

const friendListController = require('../../controllers/api/friendListController');

routers.get('/add/json/:user_id/:friend_id', friendListController.addJSONFriend);

routers.get('/add/:user_id/:friend_id', friendListController.addFriend);

routers.get('/list/:user_id', friendListController.listFriends);

routers.get('/room/:user_id/:friend_id', friendListController.getRoom);

routers.get('/allrooms/:user_id', friendListController.getUserRooms);

module.exports = routers;

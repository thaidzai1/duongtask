const routers = require('express').Router();

const communicateController = require('../../controllers/api/communicateController');

routers.get('/messages/:room_id', communicateController.getRoomMessages);

routers.put('/messages/:room_id', communicateController.NewMessages);

module.exports = routers;

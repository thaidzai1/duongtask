const routers = require('express').Router();

const userController = require('../../controllers/api/userController');

routers.get('/user/:id', userController.getUserWithID);

module.exports = routers;

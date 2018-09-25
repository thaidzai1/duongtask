const routers = require('express').Router();

const workListController = require('../../controllers/api/workplaceController');
const authMiddleware = require('../../middlewares/authMiddlewares');
const wpMiddleware = require('../../middlewares/workplaceMiddlewares');

routers.get('/boxs', workListController.getAllBoxs);

routers.get('/boxs/:user_id', workListController.getUserBoxList);

routers.post('/box', wpMiddleware.createBoxValidation, workListController.createBoxList);

routers.delete('/box/:boxId', workListController.deleteUserBox);

routers.put('/box/:box_id', wpMiddleware.updateBoxValidation, workListController.updateBoxList);

routers.get('/items', workListController.getItemList);

routers.get('/items/:box_id', workListController.getUserBoxItems);

routers.post('/item', workListController.createItem);

routers.put('/item/:item_id', workListController.updateItem);

routers.delete('/item/:item_id', workListController.deleteItem);

module.exports = routers;

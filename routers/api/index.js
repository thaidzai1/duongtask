const routers = require('express').Router();
const user = require('./userApi');
const workplace = require('./workplaceApi');
const auth = require('./authApi');
const friend = require('./friendListApi');
const authMiddleware = require('../../middlewares/authMiddlewares');
const communicate = require('./communicateApi');

routers.use(auth);
routers.use(authMiddleware.checkAuth, user);
routers.use('/friend', friend);
routers.use('/workplace', workplace);
routers.use('/communicate', communicate);

module.exports = routers;

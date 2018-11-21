const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const passport = require('passport');
const socket = require('socket.io');
const path = require('path');
const bcrypt = require('bcrypt');

//config bcrypt
const saltRounts = 10;
module.exports.bcrypt = bcrypt;

const keys = require('./config/keys');
const api = require('./routers/api');
const authRouters = require('./routers/api/authApi');
const workplaceRouters = require('./routers/api/workplaceApi');
const userRouters = require('./routers/api/userApi');
const friendListRouters = require('./routers/api/friendListApi');
const authMiddleware = require('./middlewares/authMiddlewares');

const app = express();

//config middlewares for handleing post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//config for validation
app.use(expressValidator());

//connect mongodb
mongoose.connect(keys.mongodb.dbURL, () => {
  console.log('MongoDB is connected');
});

app.use(passport.initialize());
app.use(passport.session());

//config routes
app.use('/api', api);

//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

var server = app.listen(process.env.PORT || 5000,  () => {
  console.log('Server running on port 5000');
});


//realtime
var io = socket(server);

io.on('connection', socket => {
  console.log('made a connection', socket.id);

  socket.on('startChat', room => {
    socket.join(room);
  });

  socket.on('join all rooms', data => {
    // console.log(data);
    data.map(room => {
      socket.join(room._id);
    })
  });

  socket.on('join a room', data => {
    console.log(data);
    socket.join(data._id);
  });

  socket.on('leave a room', data => {
    // console.log(data);
    socket.leave(data)
  })

  socket.on('send message', data => {
    // console.log(data);

    //use to emit event to all given socket
    // io.sockets.to(data.room).emit('send private message', {
    //   message: data.message,
    //   user_id: data.user_id
    // });

    //use to emit event to all givent socket except socket emitted
    socket.broadcast.to(data.room).emit('send private message', {
      message: data.message,
      user_id: data.user_id
    });
  });
});

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen('3001');

io.on('connection' , function (socket) {
    console.log('New User Has connected');

    socket.on('newMessage', function (data) {
        console.log(data.userName + ' send ' + data.message + ' in ' + data.room + ' room');
        socket.to(data.room).emit('clientMessage' , data);
    });

    socket.on('joinRoom', function (data) {
        console.log(data.userName + ' join to room ' + data.room);
        socket.join(data.room);
        socket.to(data.room).emit('userJoin' , data);
    });

    socket.on('leaveRoom', function (data) {
        console.log(data.userName + ' leave to room ' + data.room);
        socket.leave(data.room);
    });
});

const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {
    Users
} = require('./utils/users');

const {
    isRealString
} = require('./utils/validation');

const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');


var app = express();
const publicPath = path.join(__dirname, '../public');
//to support the express middleware and connection pooling with the viewa
app.use(express.static(publicPath));
const port = process.env.PORT || 3000
var server = http.createServer(app);
//configure the server to use socket io
var io = socketIO(server);

var users = new Users();
//it will register an event listener for any new connection
io.on('connection', (socket) => {
    console.log('New user connected');
    //non-listener doesn't requires a callback function.If you want to send data
    //provide a second argument.It can be an object as well

    /*     socket.emit('newEmail', {
            from: "paritoshvit@gmail.com",
            text: "Hi,What's up?",
            createdAt: new Date().getTime()
        }); */

    //socket.emit emits the object to a single connection.

    /* socket.emit('newMessage', {
        from: "Paritosh",
        text: "Hi,What's up?",
        createdAt: new Date().getTime()
    }); */

    /* socket.on('createEmail', (newEmail) => {
        console.log("Create Email", newEmail);
    }); */
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback("Name and room are required");
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        //Move out of the rooms
        //socket.leave("String")
        //Send the info to all the people in the particular room
        //io.emit -> io.to('The office Fans').emit

        socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));


        socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name} has joined`));


        callback();
    });

    socket.on('createMessage', (message, callback) => {
        message.createdAt = new Date().getTime();
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        //io.emit will emit the objects to all the connections


        callback();
        //it will emit the message to everyone
        //except the server who created the socket.

        /* socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        }); */
    });

    //listener requires a callback function
    socket.on('disconnect', () => {
        console.log("Browser/Client is closed");
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage("Admin", `${user.name} has left`));
        }
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    })
})
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

/* app.listen(port, () => {
    console.log(`Server started on port ${port}`);
}); */
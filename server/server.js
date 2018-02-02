const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express();
const publicPath = path.join(__dirname, '../public');
//to support the express middleware and connection pooling with the viewa
app.use(express.static(publicPath));
const port = process.env.PORT || 3000

var server = http.createServer(app);
//configure the server to use socket io
var io = socketIO(server);
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

    socket.on('createMessage', (newMessage) => {
        newMessage.createdAt = new Date().getTime();
        console.log("Create Message", newMessage);

        //io.emit will emit the objects to all the connections
        io.emit('newMessage', {
            from: "paritoshvit@gmail.com",
            text: "Hi,What's up?",
            createdAt: new Date().getTime()
        });
    });

    //listener requires a callback function
    socket.on('disconnect', () => {
        console.log("Browser/Client is closed");
    })
})
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

/* app.listen(port, () => {
    console.log(`Server started on port ${port}`);
}); */
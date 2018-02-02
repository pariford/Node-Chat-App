//it will create a web socket connection
var socket = io();
socket.on('connect', function () {
    console.log("Connected to server");

/*     socket.emit('createEmail', {
        to: "shivanics.vit@gmail.com",
        text: "Hey..This is Paritosh"
    }); */

    /* socket.emit('createMessage', {
        to: "Shivani",
        text: "Hey..This is Paritosh"
    }); */
});

socket.on('disconnect', function () {
    console.log("Diconnected from the server")
});

//the arguments here takes the object passed by the emit function
/* socket.on('newEmail', function (email) {
    console.log("New email", email);
}); */

socket.on('newMessage', function (message) {
    console.log("New message", message);
});
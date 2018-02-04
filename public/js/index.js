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
    var formattedTime = moment(message.createdAt).format("h:mm a");
    console.log("Formatted time", formattedTime);
    //To list down the items on the web screens
    //to setup jquery object on the following elements and set it to a var
    //by modifying the element and make it visible to markup
    var li = jQuery('<li></li>');
    //put the data into the li element obtained from the message var
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    //perfrom jquery operation on ol, and append it to the list as the last child.
    jQuery('#messages').append(li);
});

/* socket.emit('createMessage', {
    from: "Frank",
    text: "Hi"
}, function (message) {
    console.log("If you are receiving the ", message + " It's correct");
}) */

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    //to access the location
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser")
    }

    locationButton.attr('disabled', 'disabled').text("Sending location...");
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text("Send location");
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert("Unable to fetch the location");
        locationButton.removeAttr('disabled').text("Send location");
    });
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var li = jQuery("<li></li>");
    //non dynamic attribute target with blank,to tell the browser to open the 
    //url in the new tab
    var a = jQuery('<a target="_blank">My current location</a>');

    //we are setting properties like this to prevent any hacker
    //to maliciously enter any wrong html
    li.text(`${message.from} ${formattedTime}`);
    //If one argument it fetches the value.If two arguments it sets the value
    a.attr('href', message.url);
    li.append(": ",a);
    jQuery('#messages').append(li);

})

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: "User",
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val("");
    });
});
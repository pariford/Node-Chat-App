const _ = require('lodash');

[{
    id: "/12fnjskfhjshf",
    name: "Paritosh",
    room: "The Office Fans"
}]

//addUser(id,name,room)
//leaveRoom(id)
//getUser(id)
//getUserList(room)

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = {
            id,
            name,
            room: _.toLower(room)
        };
        var flag = 0;
        if (this.users.length > 0) {
            this.users.forEach((option) => {
                if (option.name === user.name) {
                    flag = flag + 1;
                }
            })
            if (flag === 0) {
                this.users.push(user);
            }
        } else {
            this.users.push(user);
        }
        return user;
    }
    isUnique(room, name) {
        let roomUsersList = this.getUserList(room);
        let filteredUsers = roomUsersList.filter((user) => user === name);
        return filteredUsers.length ? false : true;
    }
    removeUser(id) {
        //return the user to be removed
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList(room) {
        var users = this.users.filter((user) => _.toLower(user.room) === _.toLower(room));
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
    getRoomsList() {
        let rooms = {};
        let roomsArray = [];

        this.users.map((user) => {
            if (rooms[user.room]) {
                rooms[user.room]++;
            } else {
                rooms[user.room] = 1;
            }
        });

        Object.keys(rooms).forEach((key) => {
            roomsArray.push({
                room: key,
                users: rooms[key]
            });
        });
        console.log(roomsArray);
        return roomsArray;
    };
}


/* class Person {
    constructor(name, age) {
        //Here, this refers to the instance
        this.name = name;
        this.age = age
    }
    getUserDescription() {
        return `${this.name} is ${this.age} year(s) old.`
    }

}

var me = new Person("Paritosh", 25);
console.log("Name", me.name);
var description = me.getUserDescription();
console.log(description); */

module.exports = {
    Users
};
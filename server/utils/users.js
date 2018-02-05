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
            room
        };
        this.users.push(user);
        return user;
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
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
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
const expect = require('expect');
const {
    Users
} = require('./users');
var users;

beforeEach(() => {
    users = new Users();
    users.users = [{
            id: "1",
            name: "Paritosh",
            room: "Node Course"
        },
        {
            id: "2",
            name: "Jen",
            room: "React Course"
        }, {
            id: "3",
            name: "Julie",
            room: "Node Course"
        }
    ];
});
describe("Users", () => {
    it("should add the user to the list", () => {
        var user = {
            id: 123,
            name: "Paritosh",
            room: "The Office room"
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(resUser).toEqual(user);
    });

    it("should remove a user", () => {
        users.removeUser("2");
        expect(typeof users).not.toBe("array");
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it("should get the users of the given id", () => {
        var filteredUser = users.getUser(users.users[0].id);
        expect(filteredUser).toBe(users.users[0]);
    });

    it("should not get the users of the wrong input", () => {
        var filteredUser = users.getUser("4");
        expect(filteredUser).toBeFalsy();
    });

    it("should return the users for the node course", () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Paritosh', 'Julie']);
    });

    it("should return the users for the react course", () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jen']);
    });
})
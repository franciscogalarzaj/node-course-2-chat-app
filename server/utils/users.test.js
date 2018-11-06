const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: '13inchesLong',
            room: 'freeS3xYS3x'
        }, {
            id: 2,
            name: 'anon',
            room: 'Free the Incel inside you'
        }, {
            id: 3,
            name: 'hotBlondy69',
            room: 'freeS3xYS3x'
        }];
    });

    it('should add user', () => {
        var users = new Users();
        var user = {
            id: '69420',
            name: 'xxxSeXdR4g0Nxxx',
            room: 'Hot Local Singles in your Area <3'
        };
        var resUser = users.addUser(user);

        expect(users.users).toEqual([user]);
    });

    it('should remove an user from array', () => {
        var userToRemove = users.users[0];
        var resUsers = users.removeUser(1);

        expect(users.users.length).toBe(2);
        expect(resUsers[0]).toEqual(userToRemove);
    });

    it('should return one user', () => {
        var resUser = users.getUser(1);

        expect(resUser).toBe(users.users[0]);
    });

    it('should return users by room', () => {
        var userList = users.getUsersByRoom('Free the Incel inside you');
        
        expect(userList).toEqual(users.users[1].name);
    });
});
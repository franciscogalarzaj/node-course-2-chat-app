const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage',() => {
    it('should return message object', () => {
        var testFrom = 'Admin';
        var testText = 'Hello loser';
        var message = generateMessage(testFrom, testText);

        expect(message.from).toBe(testFrom);
        expect(message.text).toBe(testText);
        expect(message.createdAt).toBeA('number');
    });
});
const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    it('should return locationMessage object', () => {
        var testFrom = 'Admin';
        var latitude = 1;
        var longitude = 1;
        var message = generateLocationMessage(testFrom, latitude, longitude);

        expect(message.from).toBe(testFrom);
        expect(message.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
        expect(message.createdAt).toBeA('number');
    });
});
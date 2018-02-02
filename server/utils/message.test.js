const mocha = require('mocha');
const expect = require('expect');

var {
    generateMessage,
    generateLocationMessage
} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var response = generateMessage("Paritosh", "Hello");
        expect((response) => {
            expect(response.from).toBe("Paritosh");
            expect(response.text).toBe("Hello");
            expect(typeof response.createdAt).toBe('number');
        });
    });
});

describe('generateLocationMessage', () => {
    it('should generate the correct location message object', () => {
        var latitude = 1;
        var longitude = 1;
        var response = generateLocationMessage("Paritosh", latitude, longitude);
        expect((response) => {
            expect(response.from).toBe("Paritosh");
            expect(response.latitude).toExist();
        })

    })
})
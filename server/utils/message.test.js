const mocha = require('mocha');
const expect = require('expect');

var {
    generateMessage
} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var response = generateMessage("Paritosh", "Hello");
        expect((response) => {
            expect(response.from).toBe("Paritosh");
            expect(response.text).toBe("Hello");
            expect(typeof response.createdAt).toBe('number');
        })

    })
})
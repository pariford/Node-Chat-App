const expect = require('expect');
const {
    isRealString
} = require('./validation');

describe("Check the validation of the string", () => {
    it("should reject non-string values", (done) => {
        var output = isRealString(null);
        expect(output).toBe(false);
        done();
    });
    it("should reject string with just spaces", (done) => {
        var output = isRealString("         ");
        expect(output).toBe(false);
        done();
    });
    it("should allow string with non-space characters", (done) => {
        var output = isRealString("Paritosh");
        expect(output).toBe(true);
        done();
    });
});
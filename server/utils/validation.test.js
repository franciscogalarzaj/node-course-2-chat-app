const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var str = isRealString(1234);

        expect(str).toBe(false);
    });

    it('should reject only spaces strings', () => {
        var str = isRealString('   ');

        expect(str).toBe(false);
    });

    it('should allow valid string with spaces', () => {
        var str = isRealString('   fuck you');

        expect(str).toBe(true);
    });
});
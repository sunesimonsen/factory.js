var expect = require('expect.js');
var factory = require(__dirname + '/../lib/factory.js');

describe('factory', function () {
    it('it can create simple test factory', function () {
        var testFactory = factory(function () {
            return 'Test';
        });
        expect(testFactory()).to.be('Test');
    }); 

    it('makes available a sequence function to the factories', function () {
        var testFactory = factory(function () {
            console.log(this);
            return 'Test' + this.sequence();
        });
        expect(testFactory()).to.be('Test0');
        expect(testFactory()).to.be('Test1');
    });

    
});
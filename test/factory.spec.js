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
            return 'Test' + this.sequence();
        });
        expect(testFactory()).to.be('Test0');
        expect(testFactory()).to.be('Test1');
    });

    it('can create multiple instance using the create method', function () {
        var testFactory = factory(function () {
            return 'Test' + this.sequence();
        });
        var items = testFactory.create(2);
        expect(items[0]).to.be('Test0');
        expect(items[1]).to.be('Test1');
    });

    it('is possible to combine factories', function () {
        var dogFactory = factory(function () {
            return {
                name: "Test dog " + this.sequence()
            };
        });

        var personFactory = factory(function () {
            return {
                name: "Test person " + this.sequence(),
                dogs: dogFactory.create(3)
            };
        });

        var person = personFactory();
        expect(person.name).to.be('Test person 0');
        expect(person.dogs.length).to.be(3);
        expect(person.dogs[1]).to.eql({
            name: 'Test dog 1'
        });
    });
});

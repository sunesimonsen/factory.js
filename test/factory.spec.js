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

    it('makes available a randomInteger function to the factories', function () {
        var testFactory = factory(function () {
            return this.randomInteger(5);
        });
        expect(testFactory()).to.be.within(0, 5);
    });

    it('makes available a randomString function to the factories', function () {
        var testFactory = factory(function () {
            return this.randomString(5);
        });
        expect(testFactory()).to.have.length(5);
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

    describe('game example', function () {
        function Game(data) {
            this.id = data.id;
            this.isOver = data.isOver; 
            this.createAt = data.createAt; 
            this.randomSeed = data.randomSeed; 
            this.players = data.players; 
        }

        function Player(data) {
            this.id = data.id; 
            this.name = data.name; 
        }

        it('can create the game', function () {
            var playerFactory = factory(function () {
                var id = this.sequence();
                return new Player({
                    id: id,
                    name: 'Player ' + id
                });
            });

            var gameFactory = factory(function () {
                return new Game({
                    id: this.sequence(),
                    isOver: false,
                    createAt: new Date(),
                    randomSeed: this.randomInteger(10, 100),
                    players: playerFactory.create(2)
                });
            });

            var game = gameFactory();
            expect(game.id).to.be(0);
            expect(game.isOver).to.be(false);
            expect(game.randomSeed).to.be.within(10, 100);
            expect(game.players).to.have.length(2);
            expect(game.players[0]).to.eql({
                id: 0,
                name: 'Player 0'
            });
            expect(game.players[1]).to.eql({
                id: 1,
                name: 'Player 1'
            });
        });
    });
});

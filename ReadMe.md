# Factory.js

A minimal test factory library

## Usage

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

You can now build a new game the following way:

    var game = gameFactory();
  
which returns:

    {
        id: 0,
        isOver: true,
        createdAt: Wed Apr 03 2013 21:56:16 GMT+0200 (CEST),
        randomSeed: 42,
        players: [
            {id: 0, name:'Player 0'},
            {id: 1, name:'Player 1'}
        ]
    }

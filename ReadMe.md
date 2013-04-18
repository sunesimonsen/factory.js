# Factory.js

A library for create test-data factories

[![Build Status](https://travis-ci.org/sunesimonsen/factory.js.png?branch=master)](https://travis-ci.org/sunesimonsen/factory.js)

## Install

You can install the Factory.js using npm the following way:

    npm install factory.js

You can require the Factory.js using require.js the following way:
``` js
define('path/to/factory', function (factory) {
    // define you're module that uses the factory
});
```

If you choose to use the library directly in the browser the factory
will be installed in the global namespace under the name:

    weknowhow.factory

## Usage

``` js
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

var playerFactory = factory(function (name) {
    var id = this.sequence();
    name = name || 'Player ' + id;
    return new Player({
        id: id,
        name: name
    });
});

var gameFactory = factory(function () {
    var players = playerFactory.create(2);
    players.push(playerFactory('Awesome player'));
    return new Game({
        id: this.sequence(),
        isOver: false,
        createAt: new Date(),
        randomSeed: Math.random(),
        players: players
    });
});
```

You can now build a new game the following way:

``` js
var game = gameFactory();
```

which returns a Game instance with the following data:

``` js
id: 0,
isOver: true,
createdAt: Wed Apr 03 2013 21:56:16 GMT+0200 (CEST),
randomSeed: 0.672447538934648,
players: [
    { id: 0, name: 'Player 0' },
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Awesome player' }
]
```
    
### Create a new factory

You create a new factory the following way: 

``` js
var personFactory = factory(function () {
    return new Person({ name: 'Person' + this.sequence() });
});
```

This effectively binds the given function to a factory instance that
provides support for sequencing. Furthermore the given function is
decorated with methods for creating multiple instances and reset the
sequence of the factory.

### Creating an instance using the factory

You create a new instance by calling the factory:

``` js
var person0 = personFactory();
var person1 = personFactory();
```

<tt>person0</tt> will be named <i>Person0</i> and <tt>person1</tt> will
be named <i>Person1</i>.

### Creating multiple instances using the factory

You can create multiple instances using the create method on the factory:

``` js
var persons = personFactory.create(2);
```

This will create a persons array containing two persons.
<tt>person[0]</tt> will be named <i>Person0</i> and <tt>person[1]</tt>
will be named <i>Person1</i>.

### Parameterized factories

You can parameterize you factory the following way:

``` js
var personFactory = factory(function (name) {
    name = name || 'Person' + this.sequence();
    return new Person({ name: name });
});
```

When you call the personFactory with a name it will return a person
with that name; otherwise it will default to the sequenced name.

``` js
var person0 = personFactory();
var person1 = personFactory('foo');
```

<tt>person0</tt> will be named <i>Person0</i> and <tt>person1</tt> will
be named <i>Foo</i>.

If you use the <tt>create</tt> method to create multiple instances it
call the factory method with no parameters.

### Combining factory methods

You are free to combine factory methods as you are pleased. But be
aware not to create cyclic recursion.
    
``` js
var dogFactory = factory(function () {
    return new Dog({ name: 'Dog' + this.sequence() });
});

var personFactory = factory(function () {
    return new Person({ 
        name: 'Person' + this.sequence(), 
        dog: dogFactory();
    });
});
```
    
Every person you create with the personFactory will have a dog
instance associated.

``` js
var person0 = personFactory();
var person1 = personFactory();

assert(person0.name === 'Person0');
assert(person0.dog.name === 'Dog0');

assert(person1.name === 'Person1');
assert(person1.dog.name === 'Dog1');
```

### Resetting the sequence of a factory

You can reset the sequencing of a factory the following way:

``` js
var personFactory = factory(function () {
    return new Person({ name: 'Person' + this.sequence() });
});

var person0 = personFactory();
personFactory.reset();
var person1 = personFactory();
```

<tt>person0</tt> will be named <i>Person0</i> and <tt>person1</tt>
will be named <i>Person0</i>.

## Contributors

Gert Sønderby ([@gertsonderby](https://github.com/gertsonderby/))

## License

    Copyright 2013 Sune Simonsen

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

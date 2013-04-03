var alphabet = 'abcdefghijklmnopqrstuvwxyz';

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Factory() {
}

Factory.prototype.sequence = function () {
    this.count = this.count || 0;
    return this.count++;
};

Factory.prototype.randomString = function (length) {
    var result = '';
    length = length || 8;
    for (var i = 0; i < length; i++) {
        result = result + alphabet[getRandomInteger(0, alphabet.length - 1)];
    }
    return result;
};


function factory(factoryFunction) {
    factoryFunction = factoryFunction.bind(new Factory());
    factoryFunction.create = function (count) {
        var result = [];
        for (var i = 0; i < count; i++) {
            result.push(this());
        }
        return result;
    };
    return factoryFunction;
}

module.exports = factory;

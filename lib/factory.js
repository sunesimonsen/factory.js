var alphabet = 'abcdefghijklmnopqrstuvwxyz';

function Factory() {
}

Factory.prototype.sequence = function () {
    this.count = this.count || 0;
    return this.count++;
};

Factory.prototype.randomInteger = function (min, max) {
    if (!min) {
        min = 0;
        max = 100;
    } else if (!max) {
        max = min;
        min = 0;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Factory.prototype.randomString = function (length) {
    var result = '';
    length = length || 8;
    for (var i = 0; i < length; i++) {
        var c = alphabet[this.randomInteger(alphabet.length - 1)];
        result = result + c;
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

function Factory() {
}

Factory.prototype.sequence = function () {
    this.count = this.count || 0;
    return this.count++;
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

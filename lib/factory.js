var factoryMethods = {
    sequence: function () {
        this.count = this.count || 0;
        return this.count++;
    }
};

function factory(factoryFunction) {
    factoryFunction = factoryFunction.bind(factoryMethods);
    return factoryFunction;
}

module.exports = factory;
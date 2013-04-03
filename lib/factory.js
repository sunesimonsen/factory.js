var root = this;
(function () {
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
        var factoryImplementation = new Factory();
        factoryFunction = factoryFunction.bind(factoryImplementation);
        factoryFunction.create = function (count) {
            var result = [];
            for (var i = 0; i < count; i++) {
                result.push(this());
            }
            return result;
        };
        factoryFunction.reset = function () {
            factoryImplementation.count = 0;
        };
        return factoryFunction;
    }

    // Support three module loading scenarios
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        // CommonJS/Node.js
        module.exports = factory;
        exports.factory = factory;
    } else if (typeof define === 'function' && define.amd) {
        // AMD anonymous module
        define([], function () {
            return factory;
        });
    } else {
        // No module loader (plain <script> tag) - put directly in global namespace
        root.weknowhow = {
            factory: factory
        };
    }
}());

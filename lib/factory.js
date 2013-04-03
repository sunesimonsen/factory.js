// Copyright 2012 Sune Simonsen
// https://github.com/sunesimonsen/factory.js
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.var root = this;

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

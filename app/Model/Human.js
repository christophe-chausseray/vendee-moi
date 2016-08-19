"use strict";
var Human = (function () {
    function Human(name, health, consanguinity) {
        if (health === void 0) { health = 100; }
        if (consanguinity === void 0) { consanguinity = 0; }
        this.name = name;
        this.health = health;
        this.consanguinity = consanguinity;
    }
    Human.prototype.getFertility = function () {
        return this.consanguinity;
    };
    Human.prototype.getConsanguinity = function () {
        return this.consanguinity;
    };
    Human.prototype.setConsanguinity = function (consanguinity) {
        this.consanguinity = consanguinity;
    };
    Human.prototype.getHealth = function () {
        return this.health;
    };
    Human.prototype.setHealth = function (health) {
        this.health = health;
    };
    return Human;
}());
exports.Human = Human;
//# sourceMappingURL=Human.js.map
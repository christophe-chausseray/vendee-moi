"use strict";
var Good = (function () {
    function Good(code, price, label) {
        this.code = code;
        this.price = price;
        this.label = label;
    }
    Good.prototype.getId = function () {
        return this.code;
    };
    Good.prototype.getLabel = function () {
        return this.label;
    };
    Good.prototype.nutritionalValue = function () {
        return this.price;
    };
    return Good;
}());
exports.Good = Good;
//# sourceMappingURL=Good.js.map
"use strict";
var Tool = (function () {
    function Tool(code, price, label) {
        this.code = code;
        this.price = price;
        this.label = label;
    }
    Tool.prototype.getId = function () {
        return this.code;
    };
    Tool.prototype.getLabel = function () {
        return this.label;
    };
    return Tool;
}());
exports.Tool = Tool;
//# sourceMappingURL=Tool.js.map
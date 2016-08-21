"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Human_1 = require('./Human');
var Human_2 = require('./Human');
var Male = (function (_super) {
    __extends(Male, _super);
    function Male(mother, father, name, health, age) {
        if (health === void 0) { health = 100; }
        if (age === void 0) { age = -9; }
        _super.call(this, mother, father, Human_2.Gender.Male, name, health, age);
    }
    return Male;
}(Human_1.Human));
exports.Male = Male;
//# sourceMappingURL=Male.js.map
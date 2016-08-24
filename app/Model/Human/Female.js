"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Human_1 = require('./Human');
var Human_2 = require('./Human');
var Female = (function (_super) {
    __extends(Female, _super);
    function Female(mother, father, name, health, age) {
        if (health === void 0) { health = 100; }
        if (age === void 0) { age = -9; }
        _super.call(this, mother, father, Human_2.Gender.Female, name, health, age);
    }
    Female.prototype.isPregnant = function () {
        return !!this.embryo;
    };
    Female.prototype.shouldGiveBirth = function () {
        return this.isPregnant() && this.embryo.getAge() >= 0;
    };
    Female.prototype.ages = function (month) {
        _super.prototype.ages.call(this, month);
    };
    Female.prototype.canGiveBirth = function () {
        return !this.isWorking();
    };
    Female.prototype.giveBirth = function () {
        var human = this.embryo;
        this.embryo = undefined;
        return human;
    };
    Female.prototype.setEmbryo = function (human) {
        this.embryo = human;
    };
    Female.prototype.getEmbryo = function () {
        return this.embryo;
    };
    return Female;
}(Human_1.Human));
exports.Female = Female;
//# sourceMappingURL=Female.js.map
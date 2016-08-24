"use strict";
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(exports.Gender || (exports.Gender = {}));
var Gender = exports.Gender;
var Human = (function () {
    function Human(mother, father, gender, name, health, age) {
        if (health === void 0) { health = 100; }
        if (age === void 0) { age = -9; }
        this.pubertyAge = 12 * 12;
        this.menopauseAge = 60 * 12;
        this.id = Human.count++;
        this.mother = mother;
        this.father = father;
        this.gender = gender;
        this.name = name;
        this.age = age;
        this.consanguinity = this.getAncestors().length - this.getAncestors().filter(function (value, index, self) {
            return self.indexOf(value) === index;
        }).length;
        this.health = this.consanguinity <= 5 ? health : 0;
    }
    Human.prototype.getId = function () {
        return this.id;
    };
    Human.prototype.getFertility = function () {
        if (this.age < this.pubertyAge || this.age > this.menopauseAge || this.getConsanguinity() >= 5) {
            return 0;
        }
        return 1 - 0.2 * (1 - this.getHealth() / 100) - 0.2 * this.getConsanguinity();
    };
    Human.prototype.getConsanguinity = function () {
        return this.consanguinity;
    };
    Human.prototype.setHealth = function (health) {
        health = health >= 100 ? 100 : health;
        health = health <= 0 ? 0 : health;
        this.health = health;
    };
    Human.prototype.getHealth = function () {
        return this.health;
    };
    Human.prototype.getName = function () {
        return this.name;
    };
    Human.prototype.getMother = function () {
        return this.mother;
    };
    Human.prototype.getFather = function () {
        return this.father;
    };
    Human.prototype.getAge = function () {
        return this.age;
    };
    Human.prototype.getGender = function () {
        return this.gender;
    };
    Human.prototype.nutritionalValue = function () {
        return 60 + (this.health / 2) - this.age / 12;
    };
    Human.prototype.eat = function (food) {
        this.setHealth(this.getHealth() + food.nutritionalValue());
    };
    Human.prototype.ages = function (month) {
        this.age += month;
    };
    Human.prototype.fuck = function (fucked) {
        this.health -= 0.5;
    };
    Human.prototype.isFucked = function (fucker) {
        this.health -= 0.5;
    };
    Human.prototype.work = function (activity) {
        this.activity = activity;
    };
    Human.prototype.isWorking = function () {
        return undefined !== this.activity;
    };
    Human.prototype.getActivity = function () {
        return this.activity;
    };
    Human.prototype.getAncestors = function () {
        var motherAncestors = null !== this.mother ? this.mother.getAncestors().concat([this.mother]) : [];
        var fatherAncestors = null !== this.father ? this.father.getAncestors().concat([this.father]) : [];
        return motherAncestors.concat(fatherAncestors);
    };
    Human.prototype.canGiveBirth = function () {
        return false;
    };
    Human.count = 0;
    return Human;
}());
exports.Human = Human;
//# sourceMappingURL=Human.js.map
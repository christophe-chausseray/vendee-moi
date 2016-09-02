"use strict";
var Female_1 = require('../Model/Human/Female');
var Human_1 = require('../Model/Human/Human');
var Male_1 = require('../Model/Human/Male');
var names = {};
names[Human_1.Gender.Female] = [
    'Jessica',
    'Stessy',
    'Stephany',
    'Kimberley',
    'Magalie',
    'Cynthia',
    'Debora',
    'Jacqueline',
    'Josiane',
    'Germaine',
    'Odette',
    'Madelene'
];
names[Human_1.Gender.Male] = [
    'Dylan',
    'Kevin',
    'Killian',
    'Jordan',
    'Brian',
    'Anthony',
    'Jimmy',
    'Gary',
    'Johny',
    'Sulivan',
    'Jean-Michel',
    'Jacquie',
    'Didier',
    'Marcel',
    'Raymond'
];
var HumanFactory = (function () {
    function HumanFactory() {
    }
    HumanFactory.prototype.create = function (mother, father, gender, age) {
        if (gender === void 0) { gender = null; }
        if (age === void 0) { age = -9; }
        if (null === gender) {
            gender = Math.random() < 0.5 ? Human_1.Gender.Female : Human_1.Gender.Male;
        }
        var humanClass = gender === Human_1.Gender.Female ? Female_1.Female : Male_1.Male;
        return new humanClass(mother, father, names[gender][Math.floor(Math.random() * names[gender].length)], 100, age);
    };
    return HumanFactory;
}());
exports.humanFactory = new HumanFactory();
//# sourceMappingURL=HumanFactory.js.map
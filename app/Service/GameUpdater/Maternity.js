"use strict";
var Female_1 = require('../../Model/Human/Female');
var Human_1 = require('../../Model/Human/Human');
var Philippe_1 = require('../Action/Philippe');
var Maternity = (function () {
    function Maternity() {
    }
    Maternity.prototype.update = function (gameState) {
        for (var _i = 0, _a = gameState.humans; _i < _a.length; _i++) {
            var human = _a[_i];
            if (human instanceof Female_1.Female) {
                if (human.isPregnant()) {
                    human.getEmbryo().ages(1);
                }
                if (human.shouldGiveBirth()) {
                    if (gameState.humans.length === gameState.spots) {
                        human.giveBirth();
                        Philippe_1.philippe.say('Tiens, la petite ' + human.getName() + ' vient de pondre. Problème: plus de place dans la Xantia. La DDAS est sur le coup, pas de problème.');
                        return;
                    }
                    var newBorn = human.giveBirth();
                    Philippe_1.philippe.say('Tiens, ' + (newBorn.getGender() === Human_1.Gender.Female ? 'la petite' : 'le petit') + ' ' + newBorn.getName() + ' vient de rejoindre cette magnifique famille');
                    gameState.humans.push(newBorn);
                }
            }
        }
    };
    return Maternity;
}());
exports.maternity = new Maternity();
//# sourceMappingURL=Maternity.js.map
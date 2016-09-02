"use strict";
var Philippe_1 = require('./Philippe');
var Cantina = (function () {
    function Cantina() {
    }
    Cantina.prototype.eat = function (human, food, gameState) {
        human.setHealth(human.getHealth() + food.nutritionalValue());
        if (-1 !== gameState.items.indexOf(food)) {
            gameState.items.splice(gameState.items.indexOf(food), 1);
        }
        if (-1 !== gameState.humans.indexOf(food)) {
            gameState.humans.splice(gameState.humans.indexOf(food), 1);
            Philippe_1.philippe.say('Super, tu viens de bouffer un membre de ta famille. Ca sera toujours moins pire que d\'avorter!');
        }
    };
    return Cantina;
}());
exports.cantina = new Cantina();
//# sourceMappingURL=Cantina.js.map
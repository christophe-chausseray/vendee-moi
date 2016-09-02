"use strict";
var Philippe_1 = require('./Philippe');
var Merchant = (function () {
    function Merchant() {
    }
    Merchant.prototype.cash = function (gameState, good) {
        if (good.price <= gameState.money) {
            gameState.money -= good.price;
            gameState.items.push(good);
        }
        else {
            Philippe_1.philippe.say('Mince, pas assez de canettes! Je te conseille de retourner bosser, au Puy du fou par exemple!');
        }
    };
    return Merchant;
}());
exports.merchant = new Merchant();
//# sourceMappingURL=Merchant.js.map
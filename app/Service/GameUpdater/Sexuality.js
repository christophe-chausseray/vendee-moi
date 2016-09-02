"use strict";
var Prostitute_1 = require('../../Model/Activity/Prostitute');
var Philippe_1 = require('../Action/Philippe');
var Sexuality = (function () {
    function Sexuality() {
    }
    Sexuality.prototype.update = function (gameState) {
        for (var _i = 0, _a = gameState.humans; _i < _a.length; _i++) {
            var human = _a[_i];
            if (human.isWorking() && human.getActivity() instanceof Prostitute_1.ProstituteActivity && !human.isSick()) {
                var sick = Math.random() < 0.1;
                if (sick && (!human.getEquipment() || 'condom' !== human.getEquipment().code)) {
                    Philippe_1.philippe.say('Diantre, je crois que ' + human.getName() + ' a attrapé la chtouille en se frottant trop sur le trotoire!');
                    human.setSick(true);
                }
            }
        }
    };
    return Sexuality;
}());
exports.sexuality = new Sexuality();
//# sourceMappingURL=Sexuality.js.map
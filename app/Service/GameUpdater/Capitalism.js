"use strict";
var Human_1 = require('../../Model/Human/Human');
var Capitalism = (function () {
    function Capitalism() {
    }
    Capitalism.prototype.update = function (gameState) {
        for (var _i = 0, _a = gameState.humans; _i < _a.length; _i++) {
            var human = _a[_i];
            if (human.isWorking()) {
                human.getActivity().work();
                if (human.getActivity().getWorked() === human.getActivity().getDuration()) {
                    var profitability = (30 - (human.getAge() / 12)) / 30;
                    profitability = (profitability >= 0.2 ? profitability : 0.2);
                    profitability /= Human_1.Gender.Female === human.getGender() ? 1 : 2;
                    gameState.money += Math.round(human.getActivity().getRevenue() * profitability);
                    human.work(undefined);
                    human.setEquipment(null);
                }
            }
        }
    };
    return Capitalism;
}());
exports.capitalism = new Capitalism();
//# sourceMappingURL=Capitalism.js.map
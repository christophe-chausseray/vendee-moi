"use strict";
var Life = (function () {
    function Life() {
    }
    Life.prototype.update = function (gameState) {
        for (var _i = 0, _a = gameState.humans; _i < _a.length; _i++) {
            var human = _a[_i];
            human.ages(1);
            var factor = human.isSick() ? 20 : 40;
            human.setHealth(human.getHealth() - human.getAge() / (factor * 12));
        }
    };
    return Life;
}());
exports.life = new Life();
//# sourceMappingURL=Life.js.map
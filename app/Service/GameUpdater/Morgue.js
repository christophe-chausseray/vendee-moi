"use strict";
var Morgue = (function () {
    function Morgue() {
    }
    Morgue.prototype.update = function (gameState) {
        for (var _i = 0, _a = gameState.humans; _i < _a.length; _i++) {
            var human = _a[_i];
            if (0 >= human.getHealth()) {
                gameState.humans.splice(gameState.humans.indexOf(human), 1);
            }
        }
    };
    return Morgue;
}());
exports.morgue = new Morgue();
//# sourceMappingURL=Morgue.js.map
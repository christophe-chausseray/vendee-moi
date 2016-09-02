"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Boot = (function (_super) {
    __extends(Boot, _super);
    function Boot() {
        _super.apply(this, arguments);
    }
    Boot.prototype.preload = function () {
        this.load.image('vendee', 'assets/images/coeur-vendeen.png');
    };
    Boot.prototype.create = function () {
        this.game.stage.backgroundColor = 0xFFFFFF;
        // Assign global settings here
        this.game.state.start('preload');
    };
    return Boot;
}(Phaser.State));
exports.Boot = Boot;
//# sourceMappingURL=Boot.js.map
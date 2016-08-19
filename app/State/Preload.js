"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Preload = (function (_super) {
    __extends(Preload, _super);
    function Preload() {
        _super.apply(this, arguments);
    }
    Preload.prototype.preload = function () {
        this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
        this.load.setPreloadSprite(this.preloadBar);
        this.load.image('menu-background', 'assets/images/coeur-vendeen.png');
        // Load remaining assets here
    };
    Preload.prototype.create = function () {
        this.game.state.start('menu');
    };
    return Preload;
}(Phaser.State));
exports.Preload = Preload;
//# sourceMappingURL=Preload.js.map
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        _super.apply(this, arguments);
    }
    Menu.prototype.create = function () {
        var _this = this;
        this.background = this.add.sprite(this.game.width / 2, this.game.height / 2, 'vendee');
        this.background.anchor.set(0.5);
        this.input.onDown.addOnce(function () {
            _this.game.state.start('main');
        });
    };
    return Menu;
}(Phaser.State));
exports.Menu = Menu;
//# sourceMappingURL=Menu.js.map
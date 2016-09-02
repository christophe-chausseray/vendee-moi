"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Philippe_1 = require('../Service/Action/Philippe');
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
            Philippe_1.philippe.say('Hey! Bienvenue dans Vendée Moi, le meilleur jeu du monde (après les animations du Puy du fou bien sur)');
            setTimeout(function () {
                Philippe_1.philippe.say('Tu vas devoir gerer une belle famille vendéenne dans le respect des traditions de ce beau département.');
            }, 6000);
            setTimeout(function () {
                Philippe_1.philippe.say('Bon, faut éviter qu\'ils se tripotent trop entre eux, mais je serais mal placé pour les réprimander');
            }, 12000);
            setTimeout(function () {
                Philippe_1.philippe.say('Pour commencer, tu peux tapoter sur l\'un des membres de ta famille');
            }, 18000);
        });
    };
    return Menu;
}(Phaser.State));
exports.Menu = Menu;
//# sourceMappingURL=Menu.js.map
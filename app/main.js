/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Boot_1 = require('./State/Boot');
var Preload_1 = require('./State/Preload');
var Menu_1 = require('./State/Menu');
var Main_1 = require('./State/Main');
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this, 640, 480, Phaser.AUTO, 'game-div');
        this.state.add('boot', Boot_1.Boot);
        this.state.add('preload', Preload_1.Preload);
        this.state.add('menu', Menu_1.Menu);
        this.state.add('main', Main_1.Main);
        this.state.start('boot');
    }
    return Game;
}(Phaser.Game));
var game = new Game();
//# sourceMappingURL=main.js.map
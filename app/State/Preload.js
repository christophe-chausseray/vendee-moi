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
        this.preloadBar = this.add.sprite(this.game.width / 2, this.game.height / 2, 'vendee');
        this.preloadBar.anchor.set(0.5);
        this.load.setPreloadSprite(this.preloadBar);
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.image('white', 'assets/images/white.png');
        this.load.image('heart', 'assets/images/heart.png');
        this.load.image('teat', 'assets/images/teat.png');
        this.load.image('floor', 'assets/images/floor.png');
        this.load.image('baby', 'assets/images/baby.png');
        this.load.image('whore', 'assets/images/whore.png');
        this.load.image('human', 'assets/images/human.png');
        this.load.spritesheet('money', 'assets/images/money.png', 500, 455, 8);
        this.load.audio('money', ['assets/sounds/money.mp3', 'assets/sounds/money.ogg']);
        this.load.audio('jimmy', ['assets/sounds/jimmy.mp3', 'assets/sounds/jimmy.ogg']);
        this.load.image('beer', 'assets/images/beer.png');
        this.load.image('car', 'assets/images/car.png');
        this.load.image('condom', 'assets/images/shop/condom.png');
        for (var i = 1; i < 25; i++) {
            this.load.image('male_' + i, 'assets/images/male/' + i + '.png');
            this.load.image('female_' + i, 'assets/images/female/' + i + '.png');
        }
        WebFont.load({
            google: {
                families: ['Press Start 2P']
            }
        });
    };
    Preload.prototype.create = function () {
        this.game.state.start('menu');
    };
    return Preload;
}(Phaser.State));
exports.Preload = Preload;
//# sourceMappingURL=Preload.js.map
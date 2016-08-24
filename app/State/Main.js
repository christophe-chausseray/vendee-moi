"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Human_1 = require('../Model/Human/Human');
var Human_2 = require('../Sprite/Human');
var Human_3 = require('../Menu/Human');
var Select_1 = require('../Menu/Select');
var Shop_1 = require('../Menu/Shop');
var Bed_1 = require('../Service/Bed');
var HumanFactory_1 = require('../Service/HumanFactory');
var Maternity_1 = require('../Service/GameUpdater/Maternity');
var Life_1 = require('../Service/GameUpdater/Life');
var Capitalism_1 = require('../Service/GameUpdater/Capitalism');
var Morgue_1 = require('../Service/GameUpdater/Morgue');
var Prostitute_1 = require('../Model/Activity/Prostitute');
var Game_1 = require('./Game');
var origDragPoint = null;
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
        this.humanSprites = [];
    }
    Main.prototype.create = function () {
        this.stage.backgroundColor = 0x000000;
        var floor = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'floor');
        this.amountSprite = this.game.add.text(this.game.world.centerX, 70, '', {
            font: '30px Press Start 2P',
            fill: '#ffffff',
            align: 'right'
        });
        this.shopSprite = this.game.add.image(this.game.width - 160, 30, 'money');
        this.shopSprite.animations.add('fly');
        this.shopSprite.scale.set(0.3);
        this.shopSprite.animations.play('fly', 8, true);
        this.shopSprite.inputEnabled = true;
        this.shopSprite.events.onInputDown.add(function () {
            this.openShop();
        }.bind(this));
        this.moneyEmitter = this.game.add.emitter(this.game.world.centerX, 70, 5);
        this.moneyEmitter.makeParticles('beer');
        this.moneyEmitter.gravity = -200;
        this.moneyEmitter.angle = Math.random();
        this.moneyEmitter.minParticleScale = 0.5;
        this.moneyEmitter.maxParticleScale = 1.2;
        this.moneySound = this.game.add.audio('money');
        this.moneySprite = this.game.add.image(this.game.world.centerX + 20, 22, 'beer');
        this.moneySprite.scale.set(0.7);
        this.moneySprite.alignTo(this.amountSprite, Phaser.LEFT_CENTER, 0, -5);
        floor.scale['setTo'](4, 4);
        this.monthElapsedTimer = this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 3000000, this.monthElapsed, this);
        this.humansGroup = this.game.add.group();
        this.gameState = new Game_1.GameState();
        this.gameState.humans.push(HumanFactory_1.humanFactory.create(null, null, Human_1.Gender.Female, 17 * 12));
        this.gameState.humans.push(HumanFactory_1.humanFactory.create(null, null, Human_1.Gender.Male, 21 * 12));
        this.gameState.humans.push(HumanFactory_1.humanFactory.create(null, null, Human_1.Gender.Female, 14 * 12));
    };
    Main.prototype.update = function () {
        this.displayHumans(this.gameState.humans);
        this.amountSprite.text = String(this.gameState.money);
        if (this.game.input.activePointer.isDown && !this.game.paused) {
            if (origDragPoint) {
                this.game.camera.y += origDragPoint.y - this.game.input.activePointer.position.y;
            }
            origDragPoint = this.game.input.activePointer.position.clone();
        }
        else {
            origDragPoint = null;
        }
        var count = 0;
        this.humansGroup.forEach(function (sprite) {
            if (-1 === this.gameState.humans.indexOf(sprite.human)) {
                this.humansGroup.remove(sprite);
                this.humanSprites.splice(sprite.human, 1);
            }
            sprite.position.set(10, count * (sprite.height * 4) + 140);
            count++;
        }, this);
        if (this.humansGroup.height + this.humansGroup.position.x + 400 > this.game.height) {
            this.game.world.resize(this.game.width, this.humansGroup.height + this.humansGroup.position.x + 400);
        }
    };
    Main.prototype.monthElapsed = function () {
        var money = this.gameState.money;
        Life_1.life.update(this.gameState);
        Maternity_1.maternity.update(this.gameState);
        Capitalism_1.capitalism.update(this.gameState);
        Morgue_1.morgue.update(this.gameState);
        if (money !== this.gameState.money) {
            this.moneyEmitter.start(false, 2000, 10, 5);
            this.moneySound.play();
        }
        this.moneySprite.alignTo(this.amountSprite, Phaser.LEFT_CENTER, 0, -5);
    };
    Main.prototype.displayHumans = function (humans) {
        for (var _i = 0, humans_1 = humans; _i < humans_1.length; _i++) {
            var human = humans_1[_i];
            if (undefined === this.humanSprites[human.getId()]) {
                var humanSprite = new Human_2.HumanSprite(this.game, 0, 0, human);
                humanSprite.scale.set(1.3);
                humanSprite.events.onInputDown.add(function (humanSprite) {
                    this.openHumanDetails(humanSprite.getHuman());
                }.bind(this));
                this.humanSprites[human.getId()] = humanSprite;
                this.humansGroup.add(humanSprite);
            }
            this.humanSprites[human.getId()].update();
        }
    };
    Main.prototype.openHumanDetails = function (human) {
        var humanMenu = new Human_3.HumanMenu(human);
        this.openMenu(humanMenu);
        humanMenu.wantToEat.attach(function (human) {
            this.closeMenu(humanMenu);
            this.openEatMenu(human);
        }.bind(this));
        humanMenu.wantToFuck.attach(function (human) {
            this.closeMenu(humanMenu);
            this.openFuckMenu(human);
        }.bind(this));
        humanMenu.wantToProstitute.attach(function (human) {
            human.work(new Prostitute_1.ProstituteActivity());
            this.closeMenu(humanMenu);
        }.bind(this));
        humanMenu.wantToCancel.attach(function (human) {
            this.closeMenu(humanMenu);
        }.bind(this));
    };
    Main.prototype.openEatMenu = function (human) {
        var humanSelectorMenu = new Select_1.HumanSelectorMenu(human, this.gameState.humans);
        this.openMenu(humanSelectorMenu);
        humanSelectorMenu.selected.attach(function (event) {
            event.human.eat(event.selected);
            event.selected.setHealth(0);
            this.closeMenu(humanSelectorMenu);
        }.bind(this));
    };
    Main.prototype.openFuckMenu = function (human) {
        var humanSelectorMenu = new Select_1.HumanSelectorMenu(human, this.gameState.humans);
        this.openMenu(humanSelectorMenu);
        humanSelectorMenu.selected.attach(function (event) {
            Bed_1.bed.fuck(event.human, event.selected);
            this.closeMenu(humanSelectorMenu);
        }.bind(this));
    };
    Main.prototype.openShop = function () {
        var shop = new Shop_1.Shop(this.gameState.money);
        this.openMenu(shop);
        shop.selected.attach(function (event) {
            this.closeMenu(shop);
        }.bind(this));
    };
    Main.prototype.openMenu = function (menu) {
        this.game.paused = true;
        var menuDropZone = window.document.getElementById('menu');
        menuDropZone.appendChild(menu.render().el);
        menuDropZone.style.display = 'block';
    };
    Main.prototype.closeMenu = function (menu) {
        this.game.paused = false;
        var menuDropZone = window.document.getElementById('menu');
        menuDropZone.style.display = 'none';
        menu.destroy();
    };
    return Main;
}(Phaser.State));
exports.Main = Main;
//# sourceMappingURL=Main.js.map
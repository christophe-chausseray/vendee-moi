"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Female_1 = require('../Model/Human/Female');
var Human_1 = require('../Model/Human/Human');
var Human_2 = require('../Sprite/Human');
var Human_3 = require('../Menu/Human');
var Fuck_1 = require('../Menu/Fuck');
var Bed_1 = require('../Service/Bed');
var HumanFactory_1 = require('../Service/HumanFactory');
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
        this.game.world.resize(this.game.world.width, 2000);
        var floor = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'floor');
        floor.scale.setTo(2, 2);
        this.monthElapsedTimer = this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 3000000, this.monthElapsed, this);
        this.gameState = new Game_1.GameState();
        this.gameState.creatures.push(HumanFactory_1.humanFactory.create(null, null, Human_1.Gender.Female, 17 * 12));
        this.gameState.creatures.push(HumanFactory_1.humanFactory.create(null, null, Human_1.Gender.Male, 21 * 12));
        this.gameState.creatures.push(HumanFactory_1.humanFactory.create(null, null, Human_1.Gender.Female, 14 * 12));
        this.game.time.events.repeat(Phaser.Timer.SECOND * 100, 1000, this.randomEat, this);
    };
    Main.prototype.update = function () {
        this.displayHumans(this.gameState.creatures);
        if (this.game.input.activePointer.isDown && !this.game.paused) {
            if (origDragPoint) {
                this.game.camera.y += origDragPoint.y - this.game.input.activePointer.position.y;
            }
            origDragPoint = this.game.input.activePointer.position.clone();
        }
        else {
            origDragPoint = null;
        }
    };
    Main.prototype.monthElapsed = function () {
        for (var _i = 0, _a = this.gameState.creatures; _i < _a.length; _i++) {
            var human = _a[_i];
            human.ages(1);
            human.setHealth(human.getHealth() - human.getAge() / (100 * 12));
            if (human instanceof Female_1.Female && human.shouldGiveBirth()) {
                this.gameState.creatures.push(human.giveBirth());
            }
        }
    };
    Main.prototype.destroyHuman = function (human) {
        var index = this.gameState.creatures.indexOf(human, 0);
        if (index > -1) {
            this.gameState.creatures.splice(index, 1);
        }
    };
    Main.prototype.displayHumans = function (humans) {
        var count = 0;
        var humansGroup = this.game.make.group();
        for (var _i = 0, humans_1 = humans; _i < humans_1.length; _i++) {
            var human = humans_1[_i];
            if (undefined === this.humanSprites[count]) {
                var humanSprite = new Human_2.HumanSprite(this.game, 0, 0, human, count + 1);
                humanSprite.position.set(0, count * (humanSprite.height * 4 + 10) + 40);
                humanSprite.events.onInputDown.add(function (humanSprite) {
                    this.openHumanDetails(humanSprite.getHuman());
                }.bind(this));
                humansGroup.add(humanSprite);
                this.humanSprites[count] = humanSprite;
            }
            this.humanSprites[count].update();
            count++;
        }
        this.game.add.existing(humansGroup);
    };
    Main.prototype.openHumanDetails = function (human) {
        var humanMenu = new Human_3.HumanMenu(human);
        this.openMenu(humanMenu);
        humanMenu.wantToEat.attach(function (human) {
            this.openEatMenu(human);
            this.closeMenu(humanMenu);
        }.bind(this));
        humanMenu.wantToFuck.attach(function (human) {
            this.closeMenu(humanMenu);
            this.openFuckMenu(human);
        }.bind(this));
    };
    Main.prototype.openEatMenu = function (human) {
    };
    Main.prototype.openFuckMenu = function (human) {
        var fuckMenu = new Fuck_1.FuckMenu(human, this.gameState.creatures);
        this.openMenu(fuckMenu);
        fuckMenu.wantToFuck.attach(function (event) {
            Bed_1.bed.fuck(event.fucker, event.fucked);
            this.closeMenu(fuckMenu);
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
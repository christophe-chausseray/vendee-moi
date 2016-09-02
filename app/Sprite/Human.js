"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Female_1 = require('../Model/Human/Female');
var Human_1 = require('../Model/Human/Human');
var Tool_1 = require('../Model/Item/Tool');
var Prostitute_1 = require('../Model/Activity/Prostitute');
var ImageProvider_1 = require('../Service/Provider/ImageProvider');
var HumanSprite = (function (_super) {
    __extends(HumanSprite, _super);
    function HumanSprite(game, x, y, human) {
        _super.call(this, game, x, y);
        this.human = human;
        this.inputEnabled = true;
        var columnWidth = 150;
        var gender = Human_1.Gender.Female === human.getGender() ? 'female' : 'male';
        var isTeen = this.human.getAge() <= 12 * 13;
        this.humanSprite = game.make.image(isTeen ? 0 : -10, isTeen ? 30 : 0, ImageProvider_1.imageProvider.getImageIdentifier(human));
        this.humanSprite.scale.set(isTeen ? 0.4 : 0.5);
        this.equipmentSprite = game.make.image(15, 40);
        this.equipmentSprite.scale.set(1);
        this.equipmentSprite.anchor.setTo(0.5, 0.5);
        this.equipmentSprite.angle = 90;
        if (human.isSick()) {
            this.humanSprite.tint = 0xcefd26;
        }
        this.nameSprite = game.make.text(columnWidth - 20, 20, '', {
            font: '20px Press Start 2P',
            fill: '#ffffff',
            align: 'center'
        });
        this.heartSprite = game.make.image(columnWidth - 26, 50, 'heart');
        this.heartSprite.scale.set(2);
        this.healthSprite = game.make.tileSprite(columnWidth - 24, 55, 100, 6, 'white', null);
        this.teatSprite = game.make.image(columnWidth - 26, 70, 'teat');
        this.teatSprite.scale.set(2);
        this.fertilitySprite = game.make.tileSprite(columnWidth - 24, 77, 100, 6, 'white', null);
        var subTextStyle = {
            font: '14px Press Start 2P',
            fill: '#ffffff',
            align: 'right'
        };
        this.consanguinitySprite = game.make.text(columnWidth + 190, 26, '', subTextStyle);
        this.ageSprite = game.make.text(columnWidth + 240, 26, '', subTextStyle);
        this.addChild(this.humanSprite);
        this.addChild(this.nameSprite);
        this.addChild(this.healthSprite);
        this.addChild(this.heartSprite);
        this.addChild(this.fertilitySprite);
        this.addChild(this.teatSprite);
        this.addChild(this.ageSprite);
        this.addChild(this.consanguinitySprite);
        this.addChild(this.equipmentSprite);
        if (this.human instanceof Female_1.Female) {
            this.babySprite = game.make.image(columnWidth - 32, 95, 'baby');
            this.babySprite.scale.set(1.3);
            this.pregnancySprite = game.make.tileSprite(columnWidth - 24, 97, 100, 6, 'white', null);
            this.addChild(this.pregnancySprite);
            this.addChild(this.babySprite);
        }
        this.whoreSprite = game.make.image(columnWidth - 25, 91, 'whore');
        this.whoreSprite.scale.set(0.7);
        this.workSprite = game.make.tileSprite(columnWidth - 24, 97, 100, 6, 'white', null);
        this.addChild(this.workSprite);
        this.addChild(this.whoreSprite);
    }
    HumanSprite.prototype.getHuman = function () {
        return this.human;
    };
    HumanSprite.prototype.update = function () {
        var barLength = 3;
        this.nameSprite.text = this.human.getName();
        var health = Math.round(this.human.getHealth());
        this.healthSprite.width = health * barLength;
        if (health >= 50) {
            this.healthSprite.tint = 0x00cda2;
        }
        else if (health >= 20) {
            this.healthSprite.tint = 0xb58600;
        }
        else if (health >= 0) {
            this.healthSprite.tint = 0xee0000;
        }
        if (this.human.getEquipment() && this.human.getEquipment() instanceof Tool_1.Tool && 'condom' === this.human.getEquipment().code) {
            this.equipmentSprite.alpha = 1;
            this.equipmentSprite.loadTexture(ImageProvider_1.imageProvider.getImageIdentifier(this.human.getEquipment()));
        }
        else {
            this.equipmentSprite.alpha = 0;
        }
        var fertility = Math.round(this.human.getFertility() * 100);
        this.fertilitySprite.width = fertility * barLength;
        if (this.human instanceof Female_1.Female) {
            var female = this.human;
            if (female.isPregnant()) {
                this.pregnancySprite.width = (female.getEmbryo().getAge() + 9) / 9 * 100 * barLength;
                this.pregnancySprite.alpha = 1;
                this.babySprite.alpha = 1;
            }
            else {
                this.pregnancySprite.width = 0;
                this.pregnancySprite.alpha = 0;
                this.babySprite.alpha = 0;
            }
        }
        this.ageSprite.text = Math.round(this.human.getAge() / 12) + 'yo';
        this.consanguinitySprite.text = this.human.getConsanguinity() + '/5';
        if (this.human.getActivity()) {
            if (this.human.getActivity() instanceof Prostitute_1.ProstituteActivity) {
                this.workSprite.width = this.human.getActivity().getWorked() / this.human.getActivity().getDuration() * 100 * barLength;
                this.workSprite.alpha = 1;
                this.workSprite.tint = 0xf8005f;
                this.whoreSprite.alpha = 1;
            }
            else {
                this.whoreSprite.alpha = 0;
            }
        }
        else {
            this.whoreSprite.alpha = 0;
            this.workSprite.alpha = 0;
        }
    };
    return HumanSprite;
}(Phaser.Sprite));
exports.HumanSprite = HumanSprite;
//# sourceMappingURL=Human.js.map
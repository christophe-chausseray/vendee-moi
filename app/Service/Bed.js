"use strict";
var Female_1 = require('../Model/Human/Female');
var Human_1 = require('../Model/Human/Human');
var Male_1 = require('../Model/Human/Male');
var Human_2 = require('../Model/Human/Human');
var HumanFactory_1 = require('./HumanFactory');
var Philippe_1 = require('./Action/Philippe');
var Bed = (function () {
    function Bed() {
    }
    Bed.prototype.fuck = function (fucker, fucked) {
        fucker.fuck(fucked);
        fucked.isFucked(fucker);
        var sick = Math.random() < 0.5;
        if (fucked instanceof Human_2.Human && fucker instanceof Human_2.Human) {
            if (fucked.isSick() && !this.isProtected(fucked) && !this.isProtected(fucker) && !fucker.isSick() && sick) {
                fucker.setSick(true);
                Philippe_1.philippe.say('Hum, ' + fucked.getName() + ' vient de refiler ses saloperies à ' + fucker.getName() + '. Pas très malin...');
            }
            if (fucker.isSick() && !this.isProtected(fucker) && !this.isProtected(fucked) && !fucked.isSick() && sick) {
                fucked.setSick(true);
                Philippe_1.philippe.say('Hum, ' + fucker.getName() + ' vient de refiler ses saloperies à ' + fucked.getName() + '. Pas très malin...');
            }
        }
        if (fucked instanceof Female_1.Female &&
            fucked.canGiveBirth() &&
            (!fucked.getEquipment() || fucked.getEquipment().getId() !== 'condom') &&
            !fucked.isPregnant() &&
            fucker instanceof Male_1.Male &&
            (!fucker.getEquipment() || fucker.getEquipment().getId() !== 'condom') &&
            (fucker.getFertility() * fucked.getFertility()) > 0.5) {
            var human = HumanFactory_1.humanFactory.create(fucked, fucker);
            fucked.setEmbryo(human);
        }
        else {
            if (fucker instanceof Human_2.Human && fucked instanceof Human_2.Human) {
                Philippe_1.philippe.say('Arf, ' + fucker.getName() + ' vient de tripoter ' + (fucked.getGender() === Human_1.Gender.Female ? 'la petite' : 'le petit') + ' ' + fucked.getName() + '. Pas très efficace tout ça, mais je ne pourrai réprimer.');
            }
        }
    };
    Bed.prototype.isProtected = function (human) {
        return human.getEquipment() && human.getEquipment().getId() === 'condom';
    };
    return Bed;
}());
exports.bed = new Bed();
//# sourceMappingURL=Bed.js.map
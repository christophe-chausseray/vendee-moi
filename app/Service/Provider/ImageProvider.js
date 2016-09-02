"use strict";
var Human_1 = require('../../Model/Human/Human');
var Human_2 = require('../../Model/Human/Human');
var Good_1 = require('../../Model/Item/Good');
var Tool_1 = require('../../Model/Item/Tool');
var ImageProvider = (function () {
    function ImageProvider() {
    }
    ImageProvider.prototype.getImageIdentifier = function (item) {
        if (item instanceof Human_2.Human) {
            return (item.getGender() === Human_1.Gender.Female ? 'female' : 'male') + '_' + (item.getId() + 1);
        }
        else if (item instanceof Good_1.Good || item instanceof Tool_1.Tool) {
            return item.getId();
        }
    };
    ImageProvider.prototype.getImageUrl = function (item) {
        if (item instanceof Human_2.Human) {
            return 'assets/images/' +
                (item.getGender() === Human_1.Gender.Female ? 'female' : 'male') +
                '/' +
                (item.getId() + 1) +
                '.png';
        }
        else if (item instanceof Good_1.Good || item instanceof Tool_1.Tool) {
            return 'assets/images/shop/' +
                item.code +
                '.png';
        }
    };
    return ImageProvider;
}());
exports.imageProvider = new ImageProvider();
//# sourceMappingURL=ImageProvider.js.map
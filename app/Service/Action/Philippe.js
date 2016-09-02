"use strict";
var AlertView_1 = require('../../View/AlertView');
var Philippe = (function () {
    function Philippe() {
        this.alertCount = 0;
    }
    Philippe.prototype.say = function (sentence, image) {
        if (image === void 0) { image = 'philippe'; }
        this.alertCount++;
        var alertDropZone = window.document.getElementById('alert');
        alertDropZone.style.display = 'block';
        var alertView = new AlertView_1.AlertView(sentence, image);
        alertDropZone.appendChild(alertView.render().el);
        var timeout = setTimeout(function () {
            this.alertCount--;
            alertView.destroy();
            if (0 === this.alertCount) {
                alertDropZone.style.display = 'none';
            }
        }.bind(this), 8000);
        alertView.dismiss.attach(function () {
            clearTimeout(timeout);
            this.alertCount--;
            alertView.destroy();
            if (0 === this.alertCount) {
                alertDropZone.style.display = 'none';
            }
        }.bind(this));
    };
    return Philippe;
}());
exports.philippe = new Philippe();
//# sourceMappingURL=Philippe.js.map
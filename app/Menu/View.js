"use strict";
var View = (function () {
    function View() {
        this.tagName = 'div';
        this.className = '';
    }
    View.prototype.render = function () {
        return this;
    };
    View.prototype.createElement = function (html) {
        var domElement = document.createElement(this.tagName);
        domElement.innerHTML = html;
        domElement.className = this.className;
        return domElement;
    };
    View.prototype.destroy = function () {
        if (this.el && this.el.parentNode) {
            this.el.parentNode.removeChild(this.el);
        }
    };
    return View;
}());
exports.View = View;
//# sourceMappingURL=View.js.map
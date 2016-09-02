"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts_events_1 = require('ts-events');
var View_1 = require('../Menu/View');
var AlertView = (function (_super) {
    __extends(AlertView, _super);
    function AlertView(message, image) {
        _super.call(this);
        this.template = _.template("\n    <img src=\"/assets/images/<%- image %>.jpg\"/>\n    <span><%- message %></span>\n  ");
        this.dismiss = new ts_events_1.SyncEvent();
        this.className = 'message animated bounceIn';
        this.message = message;
        this.image = image;
    }
    AlertView.prototype.render = function () {
        this.el = this.createElement(this.template({
            message: this.message,
            image: this.image
        }));
        this.bindEvents();
        return this;
    };
    AlertView.prototype.bindEvents = function () {
        this.el.addEventListener('click', function () {
            this.dismiss.post();
        }.bind(this));
    };
    return AlertView;
}(View_1.View));
exports.AlertView = AlertView;
//# sourceMappingURL=AlertView.js.map
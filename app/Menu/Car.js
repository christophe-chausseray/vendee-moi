"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts_events_1 = require('ts-events');
var _ = require("lodash");
var View_1 = require('./View');
var ImageProvider_1 = require('../Service/Provider/ImageProvider');
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(items) {
        _super.call(this);
        this.items = [];
        this.template = _.template("\n    <h1>La Xantia <span>x</span></h1>\n    <ul>\n      <% _.each(items, function (item) { %>\n        <li data-item=\"<%- item.getId() %>\" style=\"background-image: url('<%- imageProvider.getImageUrl(item) %>')\">\n          <span class=\"label\"><%- item.label %></span>\n        </li>\n      <% }) %>\n    </ul>\n  ");
        this.selected = new ts_events_1.SyncEvent();
        this.dismiss = new ts_events_1.SyncEvent();
        this.className = 'car animated bounceIn';
        this.items = items;
    }
    Car.prototype.render = function () {
        this.el = this.createElement(this.template({
            items: this.items,
            imageProvider: ImageProvider_1.imageProvider
        }));
        this.bindEvents();
        return this;
    };
    Car.prototype.triggerAction = function (event) {
        this.selected.post({
            selected: _.find(this.items, function (item) {
                return item.getId() == event.currentTarget.dataset.item;
            })
        });
    };
    Car.prototype.bindEvents = function () {
        var items = this.el.querySelectorAll('li');
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            item.addEventListener('click', this.triggerAction.bind(this));
        }
        var close = this.el.querySelector('h1 span').addEventListener('click', function () {
            this.dismiss.post();
        }.bind(this));
    };
    return Car;
}(View_1.View));
exports.Car = Car;
//# sourceMappingURL=Car.js.map
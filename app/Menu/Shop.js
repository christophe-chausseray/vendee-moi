"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts_events_1 = require('ts-events');
var _ = require("lodash");
var View_1 = require('./View');
var Good_1 = require('../Model/Item/Good');
var Tool_1 = require('../Model/Item/Tool');
var ImageProvider_1 = require('../Service/Provider/ImageProvider');
var Shop = (function (_super) {
    __extends(Shop, _super);
    function Shop(money) {
        _super.call(this);
        this.items = [
            new Good_1.Good('bread', 2, 'Brioche'),
            new Good_1.Good('broccoli', 20, 'Broccoli'),
            new Good_1.Good('choux', 1, 'Choux'),
            new Good_1.Good('coca', 1, 'Coca'),
            new Good_1.Good('coffee', 2, 'Café'),
            new Good_1.Good('kechup', 2, 'Kéchup'),
            new Good_1.Good('spam', 2, 'Viande'),
            new Tool_1.Tool('condom', 5, 'Capote'),
            new Tool_1.Tool('renault', 100, 'R19')
        ];
        this.template = _.template("\n    <h1>Superette <span>x</span></h1>\n    <ul>\n      <% _.each(items, function (item) { %>\n        <li data-item=\"<%- item.code %>\" style=\"background-image: url('<%- imageProvider.getImageUrl(item) %>')\">\n          <span class=\"price\"><%- item.price %></span>\n          <span class=\"label\"><%- item.label %></span>\n        </li>\n      <% }) %>\n    </ul>\n  ");
        this.selected = new ts_events_1.SyncEvent();
        this.dismiss = new ts_events_1.SyncEvent();
        this.className = 'shop animated bounceIn';
        this.money = money;
    }
    Shop.prototype.render = function () {
        this.el = this.createElement(this.template({
            money: this.money,
            items: this.items,
            imageProvider: ImageProvider_1.imageProvider
        }));
        this.bindEvents();
        return this;
    };
    Shop.prototype.triggerAction = function (event) {
        this.selected.post({
            item: _.find(this.items, { code: event.currentTarget.dataset.item })
        });
    };
    Shop.prototype.bindEvents = function () {
        var items = this.el.querySelectorAll('li');
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            item.addEventListener('click', this.triggerAction.bind(this));
        }
        var close = this.el.querySelector('h1 span').addEventListener('click', function () {
            this.dismiss.post();
        }.bind(this));
    };
    return Shop;
}(View_1.View));
exports.Shop = Shop;
//# sourceMappingURL=Shop.js.map
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
var SelectorMenu = (function (_super) {
    __extends(SelectorMenu, _super);
    function SelectorMenu(item, items) {
        _super.call(this);
        this.template = _.template("\n    <ul>\n      <% _.each(items, function (item) { %>\n        <li data-id=\"<%- item.getId() %>\" style=\"background-image: url('<%- imageProvider.getImageUrl(item) %>')\">\n          <span><%- item.getLabel() %></span>\n        </li>\n      <% }) %>\n    </ul>\n  ");
        this.selected = new ts_events_1.SyncEvent();
        this.className = 'select-menu animated bounceIn';
        this.item = item;
        this.items = items;
    }
    SelectorMenu.prototype.render = function () {
        this.el = this.createElement(this.template({
            items: this.items.filter(function (item) {
                return item !== this.item;
            }.bind(this)),
            imageProvider: ImageProvider_1.imageProvider
        }));
        this.bindEvents();
        return this;
    };
    SelectorMenu.prototype.triggerAction = function (event) {
        this.selected.post({
            item: this.item,
            selected: _.find(this.items, function (item) {
                return item.getId() == event.currentTarget.dataset.id;
            })
        });
    };
    SelectorMenu.prototype.bindEvents = function () {
        var items = this.el.querySelectorAll('li');
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            item.addEventListener('click', this.triggerAction.bind(this));
        }
    };
    return SelectorMenu;
}(View_1.View));
exports.SelectorMenu = SelectorMenu;
//# sourceMappingURL=Select.js.map
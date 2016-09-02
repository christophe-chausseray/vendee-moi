"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts_events_1 = require('ts-events');
var _ = require('lodash');
var View_1 = require('./View');
var HumanMenu = (function (_super) {
    __extends(HumanMenu, _super);
    function HumanMenu(human) {
        _super.call(this);
        this.template = _.template("\n    <ul class=\"animated slideInUp\">\n      <li data-action=\"fuck\">Trouspiner</li>\n      <li data-action=\"eat\">Rissouner</li>\n      <li data-action=\"prostitute\">Prostituer</li>\n      <li data-action=\"equip\">Enfiler</li>\n      <li data-action=\"cancel\">Cancel</li>\n    </ul>\n  ");
        this.wantToFuck = new ts_events_1.SyncEvent();
        this.wantToEat = new ts_events_1.SyncEvent();
        this.wantToProstitute = new ts_events_1.SyncEvent();
        this.wantToEquip = new ts_events_1.SyncEvent();
        this.wantToCancel = new ts_events_1.SyncEvent();
        this.className = 'human-menu';
        this.human = human;
    }
    HumanMenu.prototype.render = function () {
        this.el = this.createElement(this.template({}));
        this.bindEvents();
        return this;
    };
    HumanMenu.prototype.triggerAction = function (event) {
        switch (event.currentTarget.dataset.action) {
            case 'eat':
                this.wantToEat.post(this.human);
                break;
            case 'fuck':
                this.wantToFuck.post(this.human);
                break;
            case 'prostitute':
                this.wantToProstitute.post(this.human);
                break;
            case 'equip':
                this.wantToEquip.post(this.human);
                break;
            case 'cancel':
                this.wantToCancel.post('string');
                break;
        }
    };
    HumanMenu.prototype.bindEvents = function () {
        var items = this.el.querySelectorAll('li');
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            item.addEventListener('click', this.triggerAction.bind(this));
        }
    };
    return HumanMenu;
}(View_1.View));
exports.HumanMenu = HumanMenu;
//# sourceMappingURL=Human.js.map
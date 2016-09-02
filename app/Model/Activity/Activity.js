"use strict";
var Activity = (function () {
    function Activity(duration, revenue) {
        this.worked = 0;
        this.duration = duration;
        this.revenue = revenue;
    }
    Activity.prototype.getDuration = function () {
        return this.duration;
    };
    Activity.prototype.getWorked = function () {
        return this.worked;
    };
    Activity.prototype.work = function () {
        this.worked++;
    };
    Activity.prototype.finished = function () {
        return this.duration === this.worked;
    };
    Activity.prototype.getRevenue = function () {
        return this.revenue;
    };
    return Activity;
}());
exports.Activity = Activity;
//# sourceMappingURL=Activity.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const preferences_1 = __importDefault(require("../model/preferences"));
const lodash_1 = __importDefault(require("lodash"));
const weekDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
];
class UserService {
    constructor() { }
    getPreferredSlotInterval() {
        return preferences_1.default.interval;
    }
    getPreferredDaysOfTheWeek() {
        const preferredDays = lodash_1.default.intersection(Object.keys(preferences_1.default), weekDays);
        return preferredDays;
    }
    getPreferredDaysWithTimeWindow() {
        const preferredDays = this.getPreferredDaysOfTheWeek();
        const pickedTimeWindows = lodash_1.default.pick(preferences_1.default, preferredDays);
        const daysWithStartAndEndTime = preferredDays.map(day => (Object.assign({ day: day }, pickedTimeWindows[day])));
        return daysWithStartAndEndTime;
    }
    getFromTodayBoundary() {
        return preferences_1.default.fromTodayBoundary;
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map
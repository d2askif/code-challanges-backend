"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
exports.getDayFromDate = (date) => {
    return moment_1.default(date).day();
};
exports.convertDayNameToNumber = (day) => {
    return moment_1.default()
        .day(day)
        .day();
};
//# sourceMappingURL=dateHelper.js.map
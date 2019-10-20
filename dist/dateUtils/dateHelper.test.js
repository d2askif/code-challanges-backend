"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const DateHelpers = __importStar(require("./dateHelper"));
test("get day from date", () => {
    const date = new Date("2019/10/15"); //'Tus oct 15 2019'
    const date2 = new Date("2019/10/17"); //'Thu oct 17 2019'
    const day = DateHelpers.getDayFromDate(date);
    const day2 = DateHelpers.getDayFromDate(date2);
    expect(day).toBe(2);
    expect(day2).toBe(4);
});
test("get day's number representation from its name", () => {
    const monday = "Monday";
    const wednesday = "wednesday";
    const mondayNumberRep = DateHelpers.convertDayNameToNumber(monday);
    const wednesdayNumberRep = DateHelpers.convertDayNameToNumber(wednesday);
    expect(mondayNumberRep).toBe(1);
    expect(wednesdayNumberRep).toBe(3);
});
//# sourceMappingURL=dateHelper.test.js.map
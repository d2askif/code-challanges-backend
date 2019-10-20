"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dateUtils_1 = require("../dateUtils/dateUtils");
const moment_1 = __importDefault(require("moment"));
const dateMonday = new Date("2019/10/14"); // Monday Oct 14 2019
const dateTuesday = new Date("2019/10/15"); // Tuesday Oct 15 2019
const dateWednesday = new Date("2019/10/16"); // Wednesday Oct 16 2019
const dateThursday = new Date("2019/10/17"); // Thursday Oct 17 2019
const dateFriday = new Date("2019/10/18"); // Friday Oct 18 2019
const dateSaturday = new Date("2019/10/19"); // Saturday Oct 19 2019
const dateSunday = new Date("2019/10/20"); // Sunday Oct 20 2019
const dates = [
    dateMonday,
    dateTuesday,
    dateWednesday,
    dateThursday,
    dateFriday,
    dateSaturday,
    dateSunday
];
test("generate date Range", () => {
    const now = new Date("2019/10/15");
    const range = 3;
    const dates = dateUtils_1.getDateRange(now, range);
    expect(dates.length).toBe(range);
    expect(dates[0].getDate()).toBe(15);
    expect(dates[0].getFullYear()).toBe(2019);
    expect(dates[0].getMonth()).toBe(9);
    expect(dates[1].getDate()).toBe(16);
    expect(dates[1].getFullYear()).toBe(2019);
    expect(dates[1].getMonth()).toBe(9);
    expect(dates[2].getDate()).toBe(17);
    expect(dates[2].getFullYear()).toBe(2019);
    expect(dates[2].getMonth()).toBe(9);
});
test("Filter dates based on the day of the week", () => {
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    const datesFiltered = dateUtils_1.filterDatesByDay(dates, days);
    expect(datesFiltered.length).toBe(5);
    const indexMonday = datesFiltered.findIndex(date => date.toLocaleDateString() === "14/10/2019");
    const indexSunday = datesFiltered.findIndex(date => date.toLocaleDateString() === "20/10/2019");
    expect(indexMonday).toBe(0);
    expect(indexSunday).toBe(-1);
});
describe("available dates with time window", () => {
    const mondayPref = {
        day: "monday",
        startTimeInMinutes: 600,
        endTimeInMinutes: 1200
    };
    const wednesdayPref = {
        day: "wednesday",
        startTimeInMinutes: 600,
        endTimeInMinutes: 960
    };
    const preference = [mondayPref, wednesdayPref];
    test("available dates will be given according to the weekdays preference", () => {
        const dateMonday = new Date("Mon, 14 October 2019 13:50:00");
        const dateWednesday = new Date("Wed, 16 October 2019 13:30:00");
        const availableDate = [dateMonday, dateWednesday];
        const dateWithTimeWindows = dateUtils_1.mapAvailableDateToTimeWindows(preference, availableDate);
        expect(dateWithTimeWindows.length).toBe(2);
        expect(dateWithTimeWindows[0]).toEqual({
            date: "2019:10:14",
            bookingStartTime: moment_1.default(dateMonday, "YYYY:MM:DD")
                .minutes(mondayPref.startTimeInMinutes)
                .toDate(),
            bookingEndTime: moment_1.default(dateMonday, "YYYY:MM:DD")
                .minutes(mondayPref.endTimeInMinutes)
                .toDate()
        });
        expect(dateWithTimeWindows[1]).toEqual({
            date: "2019:10:16",
            bookingStartTime: moment_1.default(dateWednesday, "YYYY:MM:DD")
                .minutes(wednesdayPref.startTimeInMinutes)
                .toDate(),
            bookingEndTime: moment_1.default(dateWednesday, "YYYY:MM:DD")
                .minutes(wednesdayPref.endTimeInMinutes)
                .toDate()
        });
    });
    test("available booking start time and booking end time should be with in the same date", () => {
        const dateMonday = new Date("Mon, 14 October 2019 13:50:00");
        const dateWednesday = new Date("Wed, 16 October 2019 13:30:00");
        const availableDate = [dateMonday, dateWednesday];
        const dateWithTimeWindows = dateUtils_1.mapAvailableDateToTimeWindows(preference, availableDate);
        expect(dateWithTimeWindows.length).toBe(2);
        expect(dateWithTimeWindows[0].bookingEndTime.getDate() ===
            dateWithTimeWindows[0].bookingStartTime.getDate()).toBe(true);
        expect(dateWithTimeWindows[1].bookingEndTime.getDate() ===
            dateWithTimeWindows[1].bookingStartTime.getDate()).toBe(true);
    });
    test("if the available dates don't fall on the preferred weekday returns empty array ", () => {
        const availableDate = [dateTuesday, dateThursday];
        const dateWithTimeWindows = dateUtils_1.mapAvailableDateToTimeWindows(preference, availableDate);
        expect(dateWithTimeWindows.length).toBe(0);
    });
});
describe("generateTimeSlots", () => {
    test("generates time slots with correct interval", () => {
        const startTime = new Date();
        let endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + 60);
        const intervalMinutes = 15;
        const timeSlots = dateUtils_1.generateTimeSlots(startTime, endTime, intervalMinutes);
        expect(timeSlots.length).toBe(4);
        expect(timeSlots[0].endTime.getTime() - timeSlots[0].startTime.getTime()).toBe(intervalMinutes * 60 * 1000);
    });
    test("time slots lie with in the startTime and end Time", () => {
        const startTime = new Date();
        let endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + 45);
        const intervalMinutes = 15;
        const timeSlots = dateUtils_1.generateTimeSlots(startTime, endTime, intervalMinutes);
        expect(timeSlots.length).toBe(3);
        const firstTimeSlot = timeSlots[0];
        const latTimeSlot = timeSlots[2];
        expect(firstTimeSlot.startTime.getTime() === startTime.getTime()).toBeTruthy();
        expect(latTimeSlot.endTime.getTime() === endTime.getTime()).toBeTruthy();
    });
});
describe("checkIfTimeSlotsOverLap", () => {
    const bookedSlot = {
        startTime: new Date("Wed, 16 October 2019 13:30:00"),
        endTime: new Date("Wed, 16 October 2019 13:50:00")
    };
    it("when the time slots  do not not over lapp", () => {
        const generatedTimeSlot = {
            startTime: new Date("Wed, 16 October 2019 13:51:00"),
            endTime: new Date("Wed, 16 October 2019 13:55:00")
        };
        const isOverLap = dateUtils_1.checkIfTimeSlotsOverLap(bookedSlot, generatedTimeSlot);
        expect(isOverLap).toBe(false);
    });
    it("when the start and end time of the second time slot are with in the bound of the first time slot", () => {
        const generatedTimeSlot = {
            startTime: new Date("Wed, 16 October 2019 13:35:00"),
            endTime: new Date("Wed, 16 October 2019 13:45:00")
        };
        const isOverLap = dateUtils_1.checkIfTimeSlotsOverLap(bookedSlot, generatedTimeSlot);
        expect(isOverLap).toBe(true);
    });
    it("When the start time of the second time slot lies with in the first time slot", () => {
        const generatedTimeSlot = {
            startTime: new Date("Wed, 16 October 2019 13:36:00"),
            endTime: new Date("Wed, 16 October 2019 14:00:00")
        };
        const isOverLap = dateUtils_1.checkIfTimeSlotsOverLap(bookedSlot, generatedTimeSlot);
        expect(isOverLap).toBe(true);
    });
    it("When the end time of the second time slot lies with in the first time slot", () => {
        const generatedTimeSlot = {
            startTime: new Date("Wed, 16 October 2019 13:20:00"),
            endTime: new Date("Wed, 16 October 2019 13:40:00")
        };
        const isOverLap = dateUtils_1.checkIfTimeSlotsOverLap(bookedSlot, generatedTimeSlot);
        expect(isOverLap).toBe(true);
    });
});
//# sourceMappingURL=dateUtils.test.js.map
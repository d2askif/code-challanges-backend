"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const nonEmptyFilter_1 = __importDefault(require("../utils/nonEmptyFilter"));
const lodash_1 = __importDefault(require("lodash"));
const DateHelpers = __importStar(require("./dateHelper"));
const dateFormat = "YYYY:MM:DD:HH:mm";
exports.getDateRange = (startDate, range) => {
    const rangeArray = lodash_1.default.range(0, range);
    const now = new Date(startDate);
    const dateRange = rangeArray.map(num => moment_timezone_1.default(new Date().setDate(now.getDate() + num)).toDate());
    return dateRange;
};
exports.filterDatesByDay = (dateRange, preferredDaysOfTheWeek) => {
    const filteredDates = dateRange.filter(date => {
        const dayOfWeek = DateHelpers.getDayFromDate(date);
        return (preferredDaysOfTheWeek.findIndex(day => DateHelpers.convertDayNameToNumber(day) === dayOfWeek) !== -1);
    });
    return filteredDates;
};
exports.mapAvailableDateToTimeWindows = (preference, dateRange) => {
    const dateAndWindow = dateRange.map(date => {
        const day = moment_timezone_1.default(date).format("dddd");
        const index = preference.findIndex((pref) => {
            return pref.day === day.toLowerCase();
        });
        if (index !== -1) {
            const startTimeInMinutes = preference[index].startTimeInMinutes;
            const endTimeInMinutes = preference[index].endTimeInMinutes;
            date.setHours(0, 0, 0, 0); //move time to start of day(mid night)
            const bookingStartTime = moment_timezone_1.default(date, "YYYY:MM:DD")
                .minutes(startTimeInMinutes)
                .toDate();
            const bookingEndTime = moment_timezone_1.default(date, "YYYY:MM:DD")
                .minutes(endTimeInMinutes)
                .toDate();
            return {
                date: moment_timezone_1.default(date, "YYYY:MM:DD")
                    .format("YYYY:MM:DD")
                    .toString(),
                bookingStartTime,
                bookingEndTime
            };
        }
        return null;
    });
    return dateAndWindow.filter(nonEmptyFilter_1.default);
};
exports.generateTimeSlots = (startTime, endTime, intervalInMinutes) => {
    const timeSlots = [];
    const startTimeMoment = moment_timezone_1.default(startTime);
    const endTimeMoment = moment_timezone_1.default(endTime);
    while (startTimeMoment.isBefore(endTimeMoment)) {
        timeSlots.push({
            startTime: moment_timezone_1.default(startTimeMoment).toDate(),
            endTime: startTimeMoment.add(intervalInMinutes, "minutes").toDate()
        });
    }
    return timeSlots;
};
exports.checkIfTimeSlotsOverLap = (bookedSlot, generatedSlot) => {
    const bookedStartTime = moment_timezone_1.default(bookedSlot.startTime);
    const bookedEndTime = moment_timezone_1.default(bookedSlot.endTime);
    const generatedStartTime = moment_timezone_1.default(generatedSlot.startTime);
    const generatedEndTime = moment_timezone_1.default(generatedSlot.endTime);
    if (generatedStartTime.isBetween(bookedStartTime, bookedEndTime) ||
        generatedEndTime.isBetween(bookedStartTime, bookedEndTime) ||
        bookedEndTime.isBetween(generatedStartTime, generatedEndTime) ||
        bookedStartTime.isBetween(generatedStartTime, generatedEndTime)) {
        return true;
    }
    return false;
};
exports.generateTimeSlotsForDates = (windowPerDate, intervalInMinutes) => {
    return windowPerDate.map(windowAvailable => {
        return Object.assign(Object.assign({}, windowAvailable), { timeSlots: exports.generateTimeSlots(windowAvailable.bookingStartTime, windowAvailable.bookingEndTime, intervalInMinutes) });
    });
};
exports.groupBookedTimeSlotsByDate = (slots) => {
    const slotsWithDate = slots.map(slot => ({
        date: moment_timezone_1.default(slot.startTime, "YYYY:MM:DD")
            .format("YYYY:MM:DD")
            .toString(),
        bookingStartTime: slot.startTime,
        bookingEndTime: slot.endTime
    }));
    const slotsGroupByDate = lodash_1.default.groupBy(slotsWithDate, slot => {
        return slot.date;
    });
    return slotsGroupByDate;
};
exports.removeBookedTimeSlots = (allTimeSlots, bookedTimeSlots) => {
    const openTimeSlots = allTimeSlots.map(datesWithTimeSlot => {
        const slots = datesWithTimeSlot.timeSlots.filter(slot => {
            if (!bookedTimeSlots[datesWithTimeSlot.date]) {
                return true;
            }
            return (bookedTimeSlots[datesWithTimeSlot.date].findIndex(bookedSlot => exports.checkIfTimeSlotsOverLap(slot, {
                startTime: bookedSlot.bookingStartTime,
                endTime: bookedSlot.bookingEndTime
            })) === -1);
        });
        return Object.assign(Object.assign({}, datesWithTimeSlot), { timeSlots: slots });
    });
    return openTimeSlots.filter(slot => slot.timeSlots.length > 0);
};
//# sourceMappingURL=dateUtils.js.map
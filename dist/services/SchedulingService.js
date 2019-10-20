"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateUtils_1 = require("../dateUtils/dateUtils");
class SchedulingService {
    constructor(userService, bookingService) {
        this.userService = userService;
        this.bookingService = bookingService;
    }
    generateDatesFromBoundary() {
        const boundary = this.userService.getFromTodayBoundary();
        const dateRange = dateUtils_1.getDateRange(new Date(), boundary);
        return dateRange;
    }
    mapPreferredDaysToDates() {
        const generatedDateRange = this.generateDatesFromBoundary();
        const preferredDays = this.userService.getPreferredDaysOfTheWeek();
        const datesFiltered = dateUtils_1.filterDatesByDay(generatedDateRange, preferredDays);
        return datesFiltered;
    }
    getDatesWithTimeWindows() {
        const dates = this.mapPreferredDaysToDates();
        const daysWithTimeWindows = this.userService.getPreferredDaysWithTimeWindow();
        const datesWithStartAndEndTime = dateUtils_1.mapAvailableDateToTimeWindows(daysWithTimeWindows, dates);
        return datesWithStartAndEndTime;
    }
    getTimeSlots() {
        const datesWithTimeWindows = this.getDatesWithTimeWindows();
        const interval = this.userService.getPreferredSlotInterval();
        const datesWithTimeSlots = dateUtils_1.generateTimeSlotsForDates(datesWithTimeWindows, interval);
        return datesWithTimeSlots;
    }
    getBookedTimeSlots() {
        const bookings = this.bookingService.getBookings();
        const bookedTimeSlotsGroupedByDate = dateUtils_1.groupBookedTimeSlotsByDate(bookings);
        return bookedTimeSlotsGroupedByDate;
    }
    getOpenTimeSlots() {
        const bookedTimeSlotsGroupedByDate = this.getBookedTimeSlots();
        const datesWithTimeSlots = this.getTimeSlots();
        const openTimeSlots = dateUtils_1.removeBookedTimeSlots(datesWithTimeSlots, bookedTimeSlotsGroupedByDate);
        return openTimeSlots;
    }
}
exports.default = SchedulingService;
//# sourceMappingURL=SchedulingService.js.map
import UserService from "./UserService";
import BookingService from "./BookingService";
import {
  getDateRange,
  filterDatesByDay,
  mapAvailableDateToTimeWindows,
  generateTimeSlotsForDates,
  groupBookedTimeSlotsByDate,
  removeBookedTimeSlots
} from "../dateUtils/dateUtils";
import { IDateWithTimeSlots } from "../types/types";

class SchedulingService {
  private userService: UserService;
  private bookingService: BookingService;

  constructor(userService: UserService, bookingService: BookingService) {
    this.userService = userService;
    this.bookingService = bookingService;
  }

  generateDatesFromBoundary(): Date[] {
    const boundary = this.userService.getFromTodayBoundary();
    const dateRange = getDateRange(new Date(), boundary);
    return dateRange;
  }

  mapPreferredDaysToDates(): Date[] {
    const generatedDateRange = this.generateDatesFromBoundary();
    const preferredDays = this.userService.getPreferredDaysOfTheWeek();
    const datesFiltered = filterDatesByDay(generatedDateRange, preferredDays);
    return datesFiltered;
  }

  getDatesWithTimeWindows() {
    const dates = this.mapPreferredDaysToDates();
    const daysWithTimeWindows = this.userService.getPreferredDaysWithTimeWindow();
    const datesWithStartAndEndTime = mapAvailableDateToTimeWindows(
      daysWithTimeWindows,
      dates
    );
    return datesWithStartAndEndTime;
  }

  getTimeSlots() {
    const datesWithTimeWindows = this.getDatesWithTimeWindows();
    const interval = this.userService.getPreferredSlotInterval();
    const datesWithTimeSlots = generateTimeSlotsForDates(
      datesWithTimeWindows,
      interval
    );
    return datesWithTimeSlots;
  }

  getBookedTimeSlots() {
    const bookings = this.bookingService.getBookings();

    const bookedTimeSlotsGroupedByDate = groupBookedTimeSlotsByDate(bookings);
    return bookedTimeSlotsGroupedByDate;
  }

  getOpenTimeSlots(): IDateWithTimeSlots[] {
    const bookedTimeSlotsGroupedByDate = this.getBookedTimeSlots();
    const datesWithTimeSlots = this.getTimeSlots();
    const openTimeSlots = removeBookedTimeSlots(
      datesWithTimeSlots,
      bookedTimeSlotsGroupedByDate
    );

    return openTimeSlots;
  }
}
export default SchedulingService;

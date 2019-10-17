import {
  getDateRange,
  filterDatesByDay,
  mapAvailableDateToTimeWindows,
  generateTimeSlotsForDates,
  groupBookedTimeSlotsByDate,
  checkIfTimeSlotsOverLap,
  removeBookedTimeSlots
} from "../dateUtils/dateUtils";
import preferences from "../model/preferences";
import BookingService from "../services/BookingService";
import { IBookedTimeSlot } from "../types/types";
import _ from "lodash";
import UserService from "../services/UserService";
import { SchedulingService } from "../services/SchedulingServic";

const weekDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];
export default {
  Query: {
    testMessage: (parent: any, { input }: any, ctx: any, info: any): string => {
      const bookingService = new BookingService();
      const userService = new UserService();
      const schedulingService = new SchedulingService(
        userService,
        bookingService
      );
      const openTimeSlots = schedulingService.getOpenTimeSlots();
      openTimeSlots.map(slot => console.log(slot));

      return "Hello World!";
    }
  }
};

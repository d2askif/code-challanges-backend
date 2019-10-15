import {
  getDateRange,
  filterDatesByDay,
  availableDateTimeWindow,
  generateTimeSlots
} from "../dateUtils/dateUtils";
import preferences from "../model/preferences";
import _ from "lodash";

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
      const dateRange = getDateRange(new Date(), 10);
      const preferredDays = _.intersection(Object.keys(preferences), weekDays);

      const pickedTimeWindow: { [index: string]: any } = _.pick(
        preferences,
        weekDays
      );
      const daysWithStartAndEndTime = preferredDays.map(day => ({
        day: day,
        ...pickedTimeWindow[day]
      }));
      console.log(daysWithStartAndEndTime);
      const filtered = filterDatesByDay(dateRange, preferredDays);
      const windowPerDate = availableDateTimeWindow(
        daysWithStartAndEndTime,
        filtered
      );
      console.log(windowPerDate);
      if (windowPerDate[0] !== null) {
        generateTimeSlots(
          windowPerDate[0].bookingStartTime,
          windowPerDate[0].bookingEndTime,
          15
        );
      }

      return "Hello World!";
    }
  }
};

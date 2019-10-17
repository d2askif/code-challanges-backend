import moment from "moment-timezone";
import {
  preferredTimeWindow,
  ITimeSlot,
  IDateTimeWindow,
  IDateWithTimeSlots,
  IBookedTimeSlot,
  IDateTimeWindowGrouped
} from "../types/types";
import nonEmptyFilter from "../utils/nonEmptyFilter";
import _ from "lodash";
import * as DateHelpers from "./dateHelper";
const dateFormat = "YYYY:MM:DD:HH:mm";

export const getDateRange = (startDate: Date, range: number): Date[] => {
  const rangeArray = _.range(0, range);
  const now = new Date(startDate);
  const dateRange = rangeArray.map(num =>
    moment(new Date().setDate(now.getDate() + num)).toDate()
  );

  return dateRange;
};

export const filterDatesByDay = (
  dateRange: Date[],
  preferredDaysOfTheWeek: string[]
) => {
  const filteredDates = dateRange.filter(date => {
    const dayOfWeek = DateHelpers.getDayFromDate(date);
    return (
      preferredDaysOfTheWeek.findIndex(
        day => DateHelpers.convertDayNameToNumber(day) === dayOfWeek
      ) !== -1
    );
  });

  return filteredDates;
};

export const mapAvailableDateToTimeWindows = (
  preference: preferredTimeWindow[],
  dateRange: Date[]
): IDateTimeWindow[] => {
  const dateAndWindow = dateRange.map(date => {
    const day = moment(date).format("dddd");
    const index = preference.findIndex((pref: preferredTimeWindow) => {
      return pref.day === day.toLowerCase();
    });

    if (index !== -1) {
      const startTimeInMinutes = preference[index].startTimeInMinutes;
      const endTimeInMinutes = preference[index].endTimeInMinutes;
      date.setHours(0, 0, 0, 0); //move time to start of day(mid night)
      const bookingStartTime = moment(date, "YYYY:MM:DD")
        .minutes(startTimeInMinutes)
        .toDate();
      const bookingEndTime = moment(date, "YYYY:MM:DD")
        .minutes(endTimeInMinutes)
        .toDate();
      return {
        date: moment(date, "YYYY:MM:DD")
          .format("YYYY:MM:DD")
          .toString(),
        bookingStartTime,
        bookingEndTime
      };
      // console.log({ startTimeInMinutes, endTimeInMinutes });
    }

    return null;
  });

  return dateAndWindow.filter(nonEmptyFilter);
};

export const generateTimeSlots = (
  startTime: Date,
  endTime: Date,
  intervalInMinutes: number
): ITimeSlot[] => {
  const timeSlots = [];
  const startTimeMoment = moment(startTime);
  const endTimeMoment = moment(endTime);
  while (startTimeMoment.isBefore(endTimeMoment)) {
    timeSlots.push({
      startTime: moment(startTimeMoment).toDate(),
      endTime: startTimeMoment.add(intervalInMinutes, "minutes").toDate()
    });
  }

  return timeSlots;
};

export const checkIfTimeSlotsOverLap = (
  bookedSlot: ITimeSlot,
  generatedSlot: ITimeSlot
): Boolean => {
  const bookedStartTime = moment(bookedSlot.startTime);
  const bookedEndTime = moment(bookedSlot.endTime);
  const generatedStartTime = moment(generatedSlot.startTime);
  const generatedEndTime = moment(generatedSlot.endTime);

  if (
    generatedStartTime.isBetween(bookedStartTime, bookedEndTime) ||
    generatedEndTime.isBetween(bookedStartTime, bookedEndTime) ||
    bookedEndTime.isBetween(generatedStartTime, generatedEndTime) ||
    bookedStartTime.isBetween(generatedStartTime, generatedEndTime)
  ) {
    return true;
  }

  return false;
};

export const generateTimeSlotsForDates = (
  windowPerDate: IDateTimeWindow[],
  intervalInMinutes: number
): IDateWithTimeSlots[] => {
  return windowPerDate.map(windowAvailable => {
    return {
      ...windowAvailable,
      timeSlot: generateTimeSlots(
        windowAvailable.bookingStartTime,
        windowAvailable.bookingEndTime,
        intervalInMinutes
      )
    };
  });
};

export const groupBookedTimeSlotsByDate = (
  slots: IBookedTimeSlot[]
): IDateTimeWindowGrouped => {
  const slotsWithDate = slots.map(slot => ({
    date: moment(slot.startTime, "YYYY:MM:DD")
      .format("YYYY:MM:DD")
      .toString(),
    bookingStartTime: slot.startTime,
    bookingEndTime: slot.endTime
  }));

  const slotsGroupByDate = _.groupBy(slotsWithDate, slot => {
    return slot.date;
  });

  return slotsGroupByDate;
};

export const removeBookedTimeSlots = (
  allTimeSlots: IDateWithTimeSlots[],
  bookedTimeSlots: IDateTimeWindowGrouped
) => {
  const openTimeSlots = allTimeSlots.map(datesWithTimeSlot => {
    const slots = datesWithTimeSlot.timeSlot.filter(slot => {
      if (!bookedTimeSlots[datesWithTimeSlot.date]) {
        return true;
      }
      return (
        bookedTimeSlots[datesWithTimeSlot.date].findIndex(bookedSlot =>
          checkIfTimeSlotsOverLap(slot, {
            startTime: bookedSlot.bookingStartTime,
            endTime: bookedSlot.bookingEndTime
          })
        ) === -1
      );
    });

    return {
      ...datesWithTimeSlot,
      timeSlot: slots
    };
  });

  return openTimeSlots.filter(slot => slot.timeSlot.length > 0);
};

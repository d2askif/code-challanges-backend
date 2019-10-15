import moment from "moment-timezone";
import { preferredTimeWindow } from "../types/types";
import _ from "lodash";
const dateFormat = "YYYY:MM:DD:HH:mm";
export const getDateRange = (startDate: Date, range: number): string[] => {
  const rangeArray = _.range(0, range - 1);
  const now = new Date();
  const dateRange = rangeArray.map(num =>
    moment(new Date().setDate(now.getDate() + num)).format("YYYY:MM:DD:HH:mm")
  );
  //console.log(rangeArray);
  // console.log(dateRange);

  const date = moment()
    .startOf("day")
    .add(600, "minutes")
    .format("hh:mm");
  // console.log(date);
  const date2 = moment()
    .startOf("day")
    .add(900, "minutes")
    .format("hh:mm");
  //console.log(date);
  return dateRange;
};

export const filterDatesByDay = (
  dateRange: string[],
  preferredDaysOfTheWeek: string[]
) => {
  const filteredDates = dateRange.filter(date => {
    const dayOfWeek = moment(date, dateFormat).day();
    return (
      preferredDaysOfTheWeek.findIndex(
        day =>
          moment()
            .day(day)
            .day() === dayOfWeek
      ) !== -1
    );
  });
  return filteredDates;
};

export const availableDateTimeWindow = (
  preference: preferredTimeWindow[],
  dateRange: string[]
) => {
  const dateAndWindow = dateRange.map(dateString => {
    const day = moment(dateString, dateFormat).format("dddd");
    console.log(day.toLowerCase());

    const index = preference.findIndex((pref: preferredTimeWindow) => {
      return pref.day === day.toLowerCase();
    });

    if (index !== -1) {
      // console.log("preference", preference[index]);
      const startTimeInMinutes = preference[index].startTimeInMinutes;
      const endTimeInMinutes = preference[index].endTimeInMinutes;
      const bookingStartTime = moment(dateString, "YYYY:MM:DD")
        .minutes(startTimeInMinutes)
        .toDate();
      const bookingEndTime = moment(dateString, "YYYY:MM:DD")
        .minutes(endTimeInMinutes)
        .toDate();
      return {
        date: moment(dateString, "YYYY:MM:DD")
          .format("YYYY:MM:DD")
          .toString(),
        bookingStartTime,
        bookingEndTime
      };
      // console.log({ startTimeInMinutes, endTimeInMinutes });
    }
    return null;
  });
  return dateAndWindow;
};

export const generateTimeSlots = (
  startTime: Date,
  endTime: Date,
  interval: number
) => {
  const timeSlots = [];
  const startTimeMoment = moment(startTime);
  const endTimeMoment = moment(endTime);
  while (startTimeMoment.isBefore(endTimeMoment)) {
    timeSlots.push({
      startTime: moment(startTimeMoment).toDate(),
      endTime: startTimeMoment.add(interval, "minutes").toDate()
    });
  }
  console.log(timeSlots);
};

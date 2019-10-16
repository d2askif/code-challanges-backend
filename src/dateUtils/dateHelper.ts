import moment from "moment";
export const getDayFromDate = (date: Date): number => {
  return moment(date).day();
};

export const convertDayNameToNumber = (day: string): number => {
  return moment()
    .day(day)
    .day();
};

import {
  getDateRange,
  filterDatesByDay,
  availableDateTimeWindow,
  generateTimeSlots
} from "../dateUtils/dateUtils";

test("generate date Range", () => {
  const now = new Date("2019/10/15");
  const range = 3;
  const dates = getDateRange(now, range);
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
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const datesFiltered = filterDatesByDay(dates, days);
  expect(datesFiltered.length).toBe(5);
  const indexMonday = datesFiltered.findIndex(
    date => date.toLocaleDateString() === "14/10/2019"
  );
  const indexSunday = datesFiltered.findIndex(
    date => date.toLocaleDateString() === "20/10/2019"
  );
  expect(indexMonday).toBe(0);
  expect(indexSunday).toBe(-1);
});

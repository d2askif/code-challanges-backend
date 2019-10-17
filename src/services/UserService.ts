import userSetPreferences from "../model/preferences";

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
class UserService {
  constructor() {}

  getPreferredSlotInterval(): number {
    return userSetPreferences.interval;
  }

  getPreferredDaysOfTheWeek() {
    const preferredDays = _.intersection(
      Object.keys(userSetPreferences),
      weekDays
    );

    return preferredDays;
  }

  getPreferredDaysWithTimeWindow() {
    const preferredDays = this.getPreferredDaysOfTheWeek();
    const pickedTimeWindows: { [index: string]: any } = _.pick(
      userSetPreferences,
      preferredDays
    );

    const daysWithStartAndEndTime = preferredDays.map(day => ({
      day: day,
      ...pickedTimeWindows[day]
    }));

    return daysWithStartAndEndTime;
  }

  getFromTodayBoundary(): number {
    return userSetPreferences.fromTodayBoundary;
  }
}
export default UserService;

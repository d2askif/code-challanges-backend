export interface preferredTimeWindow {
  day: string;
  startTimeInMinutes: number;
  endTimeInMinutes: number;
}

export interface ITimeSlot {
  startTime: Date;
  endTime: Date;
}

export interface IDateTimeWindow {
  date: string;
  bookingStartTime: Date;
  bookingEndTime: Date;
}

export interface IDateWithTimeSlots extends IDateTimeWindow {
  timeSlot: ITimeSlot[];
}

export interface IBookedTimeSlot {
  id: number;
  createTime: Date;
  startTime: Date;
  endTime: Date;
}
export interface IDateTimeWindowGrouped {
  [index: string]: IDateTimeWindow[];
}

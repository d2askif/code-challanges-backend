export interface preferredTimeWindow {
  day: string;
  startTimeInMinutes: number;
  endTimeInMinutes: number;
}

export interface ITimeSlot {
  startTime: Date;
  endTime: Date;
}

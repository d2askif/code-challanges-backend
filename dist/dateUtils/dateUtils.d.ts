import { preferredTimeWindow, ITimeSlot, IDateTimeWindow, IDateWithTimeSlots, IBookedTimeSlot, IDateTimeWindowGrouped } from "../types/types";
export declare const getDateRange: (startDate: Date, range: number) => Date[];
export declare const filterDatesByDay: (dateRange: Date[], preferredDaysOfTheWeek: string[]) => Date[];
export declare const mapAvailableDateToTimeWindows: (preference: preferredTimeWindow[], dateRange: Date[]) => IDateTimeWindow[];
export declare const generateTimeSlots: (startTime: Date, endTime: Date, intervalInMinutes: number) => ITimeSlot[];
export declare const checkIfTimeSlotsOverLap: (bookedSlot: ITimeSlot, generatedSlot: ITimeSlot) => Boolean;
export declare const generateTimeSlotsForDates: (windowPerDate: IDateTimeWindow[], intervalInMinutes: number) => IDateWithTimeSlots[];
export declare const groupBookedTimeSlotsByDate: (slots: IBookedTimeSlot[]) => IDateTimeWindowGrouped;
export declare const removeBookedTimeSlots: (allTimeSlots: IDateWithTimeSlots[], bookedTimeSlots: IDateTimeWindowGrouped) => {
    timeSlots: ITimeSlot[];
    date: string;
    bookingStartTime: Date;
    bookingEndTime: Date;
}[];

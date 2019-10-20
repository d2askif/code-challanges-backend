import UserService from "./UserService";
import BookingService from "./BookingService";
import { IDateWithTimeSlots } from "../types/types";
declare class SchedulingService {
    private userService;
    private bookingService;
    constructor(userService: UserService, bookingService: BookingService);
    generateDatesFromBoundary(): Date[];
    mapPreferredDaysToDates(): Date[];
    getDatesWithTimeWindows(): import("../types/types").IDateTimeWindow[];
    getTimeSlots(): IDateWithTimeSlots[];
    getBookedTimeSlots(): import("../types/types").IDateTimeWindowGrouped;
    getOpenTimeSlots(): IDateWithTimeSlots[];
}
export default SchedulingService;

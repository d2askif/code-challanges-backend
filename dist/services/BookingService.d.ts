import { IBookedTimeSlot } from "../types/types";
declare class BookingService {
    constructor();
    getBookings(): IBookedTimeSlot[];
}
export default BookingService;

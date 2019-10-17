import { IBookedTimeSlot } from "../types/types";
import model from "../model/bookings";
class BookingService {
  constructor() {}

  public getBookings(): IBookedTimeSlot[] {
    return model;
  }
}
export default BookingService;

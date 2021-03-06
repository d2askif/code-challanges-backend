import { gql } from "apollo-server";
export default gql`
  scalar Date

  type TimeSlot {
    startTime: Date
    endTime: Date
  }

  type DateWithTimeSlots {
    date: String
    bookingStartTime: Date
    bookingEndTime: Date
    timeSlots: [TimeSlot]
  }

  type Query {
    getOpenTimeSlots: [DateWithTimeSlots]!
  }
`;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
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
//# sourceMappingURL=schema.js.map
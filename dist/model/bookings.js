"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateBookingDateTime({ daysFromNow, hours }) {
    const today = new Date();
    const notToday = new Date().setDate(today.getDate() + daysFromNow); // lol
    return new Date(new Date(notToday).setHours(hours, 0, 0, 0));
}
exports.generateBookingDateTime = generateBookingDateTime;
exports.default = [
    {
        id: 1,
        createTime: new Date(),
        startTime: generateBookingDateTime({ daysFromNow: 1, hours: 10 }),
        endTime: generateBookingDateTime({ daysFromNow: 1, hours: 12 })
    },
    {
        id: 2,
        createTime: new Date(),
        startTime: generateBookingDateTime({ daysFromNow: 1, hours: 13 }),
        endTime: generateBookingDateTime({ daysFromNow: 1, hours: 14 })
    },
    {
        id: 3,
        createTime: new Date(),
        startTime: generateBookingDateTime({ daysFromNow: 2, hours: 10 }),
        endTime: generateBookingDateTime({ daysFromNow: 2, hours: 12 })
    },
    {
        id: 4,
        createTime: new Date(),
        startTime: generateBookingDateTime({ daysFromNow: 3, hours: 10 }),
        endTime: generateBookingDateTime({ daysFromNow: 3, hours: 12 })
    },
    {
        id: 5,
        createTime: new Date(),
        startTime: generateBookingDateTime({ daysFromNow: 4, hours: 10 }),
        endTime: generateBookingDateTime({ daysFromNow: 4, hours: 12 })
    }
];
//# sourceMappingURL=bookings.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookings_1 = __importDefault(require("../model/bookings"));
class BookingService {
    constructor() { }
    getBookings() {
        return bookings_1.default;
    }
}
exports.default = BookingService;
//# sourceMappingURL=BookingService.js.map
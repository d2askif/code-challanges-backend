declare class UserService {
    constructor();
    getPreferredSlotInterval(): number;
    getPreferredDaysOfTheWeek(): string[];
    getPreferredDaysWithTimeWindow(): any[];
    getFromTodayBoundary(): number;
}
export default UserService;

interface IParams {
    daysFromNow: number;
    hours: number;
}
export declare function generateBookingDateTime({ daysFromNow, hours }: IParams): Date;
declare const _default: {
    id: number;
    createTime: Date;
    startTime: Date;
    endTime: Date;
}[];
export default _default;

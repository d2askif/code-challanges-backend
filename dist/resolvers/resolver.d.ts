import { GraphQLScalarType } from "graphql";
declare const _default: {
    Date: GraphQLScalarType;
    Query: {
        getOpenTimeSlots: (parent: any, { input }: any, cxt: any, info: any) => import("../types/types").IDateWithTimeSlots[];
    };
};
export default _default;

import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import SchedulingService from "../services/SchedulingService";

const weekDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];
export default {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value: string) {
      return new Date(value); // value from the client
    },
    serialize(value: Date) {
      return value.toISOString(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  }),

  Query: {
    getOpenTimeSlots: (parent: any, { input }: any, cxt: any, info: any) => {
      const schedulingService: SchedulingService = cxt.schedulingService;
      const openTimeSlots = schedulingService.getOpenTimeSlots();

      return openTimeSlots;
    }
  }
};

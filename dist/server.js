"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./schema");
const BookingService_1 = __importDefault(require("./services/BookingService"));
const UserService_1 = __importDefault(require("./services/UserService"));
const SchedulingService_1 = __importDefault(require("./services/SchedulingService"));
const context = ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingService = new BookingService_1.default();
    const userService = new UserService_1.default();
    const schedulingService = new SchedulingService_1.default(userService, bookingService);
    return { schedulingService };
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const apolloServer = new apollo_server_1.ApolloServer({
        context,
        schema: schema_1.schema,
        debug: false
    });
    const port = process.env.PORT || 4000;
    apolloServer.listen(port).then(() => {
        console.log('server started at http://localhost:4000/graphql');
    });
});
main();
//# sourceMappingURL=server.js.map
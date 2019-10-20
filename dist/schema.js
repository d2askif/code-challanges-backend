"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const resolver_1 = __importDefault(require("./resolvers/resolver"));
const schema_1 = __importDefault(require("./schemas/schema"));
exports.schema = graphql_tools_1.makeExecutableSchema({
    resolvers: [resolver_1.default],
    typeDefs: [schema_1.default]
});
//# sourceMappingURL=schema.js.map
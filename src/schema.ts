import { makeExecutableSchema } from "graphql-tools";
import resolver from "./resolvers/resolver";
import typeDefs from "./schemas/schema";

export const schema = makeExecutableSchema({
  resolvers: [resolver],
  typeDefs: [typeDefs]
});

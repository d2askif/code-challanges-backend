import { makeExecutableSchema } from "graphql-tools";
import userResolver from "./resolvers/resolver";
import typeDefs from "./schemas/schema";

export const schema = makeExecutableSchema({
  resolvers: [userResolver],
  typeDefs: [typeDefs]
});

import { ApolloServer } from "apollo-server";
import { schema } from "./schema";

const context = async ({ req }: any) => {
  return {};
};

const main = async () => {
  const apolloServer = new ApolloServer({
    context,
    schema,
    debug: false
  });

  apolloServer.listen().then(() => {
    console.log("server started at http://localhost:4000/graphql");
  });
};

main();

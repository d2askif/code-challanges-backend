import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import BookingService from './services/BookingService';
import UserService from './services/UserService';
import SchedulingService from './services/SchedulingService';

const context = async ({ req }: any) => {
  const bookingService = new BookingService();
  const userService = new UserService();
  const schedulingService = new SchedulingService(userService, bookingService);
  return { schedulingService };
};

const main = async () => {
  const apolloServer = new ApolloServer({
    context,
    schema,
    debug: false
  });
  const port = process.env.PORT || 4000;
  apolloServer.listen(port).then(() => {
    console.log('server started at http://localhost:4000/graphql');
  });
};

main();

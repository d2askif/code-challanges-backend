export default {
  Query: {
    testMessage: (parent: any, { input }: any, ctx: any, info: any): string => {
      return "Hello World!";
    }
  }
};

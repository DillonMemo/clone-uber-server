import { Resolvers } from 'src/types/resolvers';

const resolver: Resolvers = {
  Query: {
    GetMyProfile: async (_, __, context) => {
      const { user } = context;
      try {
        return {
          ok: true,
          error: null,
          user,
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
        };
      }
    },
  },
};

export default resolver;

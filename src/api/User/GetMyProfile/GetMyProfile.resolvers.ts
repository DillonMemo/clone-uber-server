import { Resolvers } from 'src/types/resolvers';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Query: {
    // GetMyProfile: async (_, __, context) => {
    //   const { student, req } = context;
    //   console.log('Get My Profile [User]', req.user, student);

    //   // user가 없다면 null을 반환
    //   return {
    //     ok: true,
    //     error: null,
    //     user: req.user,
    //   };
    // },
    GetMyProfile: privateResolver(async (_, __, context) => {
      const { student, req } = context;
      console.log('Get My Profile [User]', req.user, student);

      return {
        ok: true,
        error: null,
        user: req.user,
      };
    }),
  },
};

export default resolvers;

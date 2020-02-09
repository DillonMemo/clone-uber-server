import { Resolvers } from 'src/types/resolvers';
import User from '../../../entities/User';
import { FacebookConnectMutationArgs, FacebookConnectResponse } from 'src/types/graphql';

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs,
    ): Promise<FacebookConnectResponse> => {
      const { fbId } = args;
      try {
        // 유저들중 facebook ID가 있는지 없는지 확인
        const existingUser = await User.findOne({ fbId });
        console.log('existingUser', existingUser);
        if (existingUser) {
          return {
            ok: true,
            error: null,
            token: 'Comming soon, already',
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }

      // facebook ID가 없다면 유저 생성
      try {
        await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`,
        }).save();

        return {
          ok: true,
          error: null,
          token: 'Comming soon, created',
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;

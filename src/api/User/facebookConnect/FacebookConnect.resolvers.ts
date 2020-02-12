import { Resolvers } from 'src/types/resolvers';
import User from '../../../entities/User';
import { FacebookConnectMutationArgs, FacebookConnectResponse } from 'src/types/graphql';
import createJWT from '../../../utils/createJWT';

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
          const token = createJWT(existingUser.id);
          return {
            ok: true,
            error: null,
            token,
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
        const newUser = await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`,
        }).save();

        const token = createJWT(newUser.id);

        return {
          ok: true,
          error: null,
          token,
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

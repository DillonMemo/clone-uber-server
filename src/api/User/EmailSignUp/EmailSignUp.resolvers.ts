import User from '../../../entities/User';
import { EmailSignUpMutationArgs, EmailSignUpResponse } from 'src/types/graphql';
import { Resolvers } from 'src/types/resolvers';
import createJWT from '../../../utils/createJWT';

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
      const { email } = args;
      try {
        const existingUser = await User.findOne({ email });

        // 유저 존재 여부
        if (existingUser) {
          return {
            ok: false,
            error: 'You should log in instead\n유저가 존재 합니다.',
            token: null,
          };
        } else {
          // const newUser = await User.create({ ...args }).save();
          const newUser = await User.create({ ...args }).save();
          const token = createJWT(newUser.id);
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
    },
  },
};

export default resolvers;

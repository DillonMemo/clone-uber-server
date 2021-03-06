import { Resolvers } from 'src/types/resolvers';
import User from '../../../entities/User';
import { EmailSignInMutationArgs, EmailSignInResponse } from 'src/types/graphql';
import createJWT from '../../../utils/createJWT';

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (_, args: EmailSignInMutationArgs): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
        // 사용자 가저오기
        const user = await User.findOne({ email });
        console.log(user);

        if (!user) {
          return {
            ok: false,
            error: 'No User found with that email',
            token: null,
          };
        }

        // 입력 받은 패스워드 체크
        const checkPassword = await user.comparePassword(password);

        if (checkPassword) {
          const token = createJWT(user.id);
          return {
            ok: true,
            error: null,
            token,
          };
        } else {
          return {
            ok: false,
            error: 'Wrong password\n' + JSON.stringify(user),
            token: null,
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

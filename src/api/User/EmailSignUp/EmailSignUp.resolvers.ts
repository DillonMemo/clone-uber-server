import User from '../../../entities/User';
import Verification from '../../../entities/Verification';
import { EmailSignUpMutationArgs, EmailSignUpResponse } from 'src/types/graphql';
import { Resolvers } from 'src/types/resolvers';
import createJWT from '../../../utils/createJWT';
import { sendVerificationEmail } from '../../../utils/sendEmail';

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
          // 핸드폰 유효 체크
          const phoneVerification = await Verification.findOne({
            payload: args.phoneNumber,
            verified: true,
          });

          if (phoneVerification) {
            // const newUser = awa it User.create({ ...args }).save();
            const newUser = await User.create({ ...args }).save();

            // 메일 유효 체크
            if (newUser.email) {
              const emailVerification = await Verification.create({
                payload: newUser.email,
                target: 'EMAIL',
              }).save();

              console.log(newUser.fullName, emailVerification.key);
              await sendVerificationEmail(newUser.fullName, emailVerification.key);
            }

            const token = createJWT(newUser.id);
            return {
              ok: true,
              error: null,
              token,
            };
          } else {
            return {
              ok: false,
              error: "You haven't verified your phone number",
              token: null,
            };
          }
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

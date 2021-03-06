import User from '../../../entities/User';
import cleanNullArgs from '../../../utils/cleanNullArgs';
import { UpdateMyProfileMutationArgs, UpdateMyProfileResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (_, args: UpdateMyProfileMutationArgs, { req }): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        const notNull = cleanNullArgs(args);

        try {
          // user 엔티티의 BeforeInsert와 BeforeUpdate에서 hash되지 않은 비밀번호로 업데이트 되어지는 문제가 있어서 password 세이브를 선언
          if (args.password !== null) {
            user.password = args.password;
            user.save();
          }

          await User.update({ id: user.id }, { ...notNull });
          return {
            ok: true,
            error: null,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          };
        }
      },
    ),
  },
};

export default resolvers;

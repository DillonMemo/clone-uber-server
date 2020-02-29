import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import { UpdateMyProfileMutationArgs } from '../../../types/graphql';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(async (_, args: UpdateMyProfileMutationArgs, { req }) => {
      const user: User = req.user;

      await User.update({
        ...args,
        id: user.id,
      });
    }),
  },
};

export default resolvers;

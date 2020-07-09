import User from '../../../entities/User';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import { EditPlaceResponse, EditPlaceMutationArgs } from '../../../types/graphql';
import Place from '../../../entities/Place';
import cleanNullArgs from '../../../utils/cleanNullArgs';

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(
      async (_, args: EditPlaceMutationArgs, { req }): Promise<EditPlaceResponse> => {
        const user: User = req.user;
        //   const place = await Place.findOne(
        //     { id: args.placeId },
        //     {
        //       relations: ['user'],
        //     } /** typeORM은 find 할때 관계된 속성을 가져오지 않아서 설정 해줌. */,
        //   );
        try {
          const place = await Place.findOne({ id: args.placeId });

          if (place) {
            if (place.userId === user.id) {
              const notNull: any = cleanNullArgs(args); // 👈\

              // update 할때 place 엔티티의 placeId는 기본키 이므로 수정을 할 수 없으므로 placeId가 존재 하면 제거 해줍니다.
              if (notNull.placeId !== null) {
                delete notNull.placeId;
              }

              await Place.update({ id: args.placeId }, { ...notNull });

              return {
                ok: true,
                error: null,
              };
            } else {
              return {
                ok: false,
                error: 'Not Authorized',
              };
            }
          } else {
            return {
              ok: false,
              error: 'Place not found.',
            };
          }
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

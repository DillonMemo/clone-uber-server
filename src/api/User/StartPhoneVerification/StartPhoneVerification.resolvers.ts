import { Resolvers } from 'src/types/resolvers';
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse,
} from '../../../types/graphql';
import Verification from '../../../entities/Verification';
import { sendVerificationSMS } from '../../../utils/sendSMS';

/**
 * @since 2020.02.09
 * @author dillon Jang
 * @description - 핸드폰 번호가 기존에 검증된 번호인지를 찾고 검증된 번호 일 경우 해당 번호로 등록된 검증을 제거.
 * @description - 검증을 생성하고 암호 key를 전송
 */
const resolvers: Resolvers = {
  Mutation: {
    StartPhoneVerification: async (
      _,
      args: StartPhoneVerificationMutationArgs,
    ): Promise<StartPhoneVerificationResponse> => {
      const { phoneNumber } = args;
      try {
        const existingVerification = await Verification.findOne({
          payload: phoneNumber,
        });

        // 이미 검증 되었더라면 이전 검증을 삭제
        if (existingVerification) {
          existingVerification.remove();
        }

        // 새로운 검증을 생성
        const newVerification = await Verification.create({
          payload: phoneNumber,
          target: 'PHONE',
        }).save();

        // Send SMS
        console.log('newVerification', newVerification);
        await sendVerificationSMS(newVerification.payload, newVerification.key);
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
  },
};

export default resolvers;

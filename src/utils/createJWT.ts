import jwt from 'jsonwebtoken';

/**
 * JSON Web Token 생성
 * userId를 받고 token안에 넣어서 userId를 암호화하여 user에게 주고, user는 매 request마다 token을 보냄.
 * @param userId - 해당 UserId의 JWT 생성
 */
const createJWT = (userId: number): string => {
  // strong password generator 검색
  const token = jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_TOKEN || '',
  );
  return token;
};

export default createJWT;

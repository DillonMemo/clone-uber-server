import jwt from 'jsonwebtoken';
import User from '../entities/User';

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decode: any = jwt.verify(token, process.env.JWT_TOKEN || '');
    console.log('decodeJWT', decode);

    const { id } = decode;
    const user = await User.findOne({ id });

    return user;
  } catch (error) {
    return undefined;
  }
};

export default decodeJWT;

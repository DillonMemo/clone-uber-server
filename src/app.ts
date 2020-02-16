import cors from 'cors';
import { NextFunction, Response } from 'express';
import decodeJWT from './utils/decodeJWT';
import { GraphQLServer } from 'graphql-yoga';
import helmet from 'helmet';
import logger from 'morgan';
import schema from './schema';

class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({
      schema,
      // context란 graphql resolver에서 기본적으로 가지고 있는것으로 server의 정보 이다. 그래서 우리는 여기(GraphQLServer)에서 resolver로 보낼 수 있다.
      context: req => ({
        student: '장동원',
        req: req.request,
      }),
    });
    this.middlewares();
  }

  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger('dev'));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  /**
   * 가져온 JWT 토큰을 디코더 하여 해당 JWT의 유저 아이디로 유저를 찾음.
   */
  private jwt = async (req, res: Response, next: NextFunction): Promise<void> => {
    const token = req.get('X-JWT');
    if (token) {
      const user = await decodeJWT(token);
      console.log('jwt user', user);

      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    // 다음 미들웨어가 실행 될 수 있도록 next 선언
    next();
  };
}

export default new App().app;

# 연습 저장소 - 우버 클론

nomad academy의 우버 강의를 보고 기록한 저장소 입니다.

## Resolvers

### Public Resolvers:

- [x] Sing In / Sing Up with Facebook
- [x] Sing In with Email
- [x] Start phone number verification
- [x] Complete phone number verification
- [ ] Sign Up with Email

### Authentication:

- [ ] Generate JWT(JSON Web Token)
- [ ] Verify JWT(JSON Web Token)

### Private Resolvers:

- [ ] Verify Email
- [ ] Get my profile
- [ ] Update my profile
- [ ] Toggle driving mode
- [ ] Report location / orientation
- [ ] Add place
- [ ] Update place
- [ ] Delete place
- [ ] See nearby drivers
- [ ] Subscribe to nearby drivers
- [ ] Request a Ride
- [ ] Get nearby rides
- [ ] Subscribe to nearby ride requests
- [ ] Subscribe to ride status
- [ ] Get chat room messages
- [ ] Subscribe to chat room messages
- [ ] Send a chat message

## Code Challenge

- [ ] Get ride history
- [ ] See ride detail

---

**npm install**

1. `npm i typescript ts-node nodemon cors dotenv helmet morgan bcrypt`
2. `npm i -D @types/node @types/cors @types/helmet @types/morgan babel-runtime tslint-config-prettier`

   **using GraphQL**

   1. `npm i graphql-tools graphql-yoga merge-graphql-schemas`
   2. `npm i -D gql-merge graphql-to-typescript`

   **using TypeORM and DB**

   1. `npm i typeorm class-validator`
   2. `npm i mysql` && `npm i pg` 쓰고자 하는 db 설치

**미들웨어(middleware)**

> 앱의 연결이나 요청들을 다루는 방식을 수정
> 예를 들어, 모든 요청을 콘솔에 로깅(기록)하는 미들웨어를 만들고 싶어 우리의 앱에 일어나는 모든 행동을들을 콘솔에 기록 하게 되는데 누군가가 우리 앱의 API로 무언가를 할 때마다, 이 미들웨어가 요청을 가로채서 기록하고, 다음 단계로 진행 되도록 함.

**[graphql-yoga](https://github.com/prisma/graphql-yoga)**

- subscription, tools, graphql playground등을 빠르게 설정 할 수 있도록 도와주는 라이브러리

**[helmet](https://github.com/helmetjs/helmet)**

- helmet은 보안을 위한 **미들웨어**이며, 요청 때마다 미들웨어가 요청을 잠시 멈추고 검사한 후에 위험하지 않다고 판단되면 요청을 계속 진행시키는 라이브러리

**[TypeORM](https://github.com/typeorm/typeorm)**

- 복잡한 데이터베이스(SQL)언어의 작업을 ORM(Object Relational Mapper)를 사용함으로써 SQL언어로 바꿔주는 라이브러리
- TypeORM은 Typescript로 만들어 졌으며 Typescript로 개발하는 환경에 적합해 보인다.

**순서도**

- GraphQL파일(\*.graphql) 생성
  - type 지정
- Entiti파일(\*.ts) 생성
  - @PrimaryGeneratedColumn - 기본키 컬럼 생성
  - @Column - 컬럼 생성
  - @ManyToOne | @OneToMany - Relationship(관계도) 구성
  - @CreateDateColumn | @UpdateDateColumn - 날짜형 컬럼 생성
- Resolvers파일(\*.resolvers.ts) 생성
  - Mutation process 처리

**Issue**

- npm bcrypt 설치시 오류 발생 할 경우 node 버전을 확인 하고 Current버전 이라면 삭제 후 LTS 버전으로 재설치. > 이후에도 오류가 발생 하면 powerShell 관리자 권한으로 실행 한 후 `npm i -g windows-build-tools` 실행 후 `npm i bcrypt` 설치

  - 윈도우에서 필수인 c, c++ 관련된 것들과 파이썬같은 것을 설치해서 다른 언어를 사용하는 라이브러리르 지원할 수 있게 해주는데, bcrypt는 속도 때문에 c++인가 내부적으로 쓰는 것으로 알고 있음.
  - 아래와 같은 bcrypt 관련 오류가 나올 때 `rm -rf node_modules` > `npm install`

  ````
  Error: dlopen(/Volumes/Samsung_T5/workspace/clone/uber/server/node_modules/bcrypt/lib/binding/bcrypt_lib.node, 1): no suitable image found.  Did find:
        /Volumes/Samsung_T5/workspace/clone/uber/server/node_modules/bcrypt/lib/binding/bcrypt_lib.node: unknown file type, first eight bytes: 0x4D 0x5A 0x90 0x00 0x03 0x00 0x00 0x00
        /Volumes/Samsung_T5/workspace/clone/uber/server/node_modules/bcrypt/lib/binding/bcrypt_lib.node: unknown file type, first eight bytes: 0x4D 0x5A 0x90 0x00 0x03 0x00 0x00 0x00```
  ````

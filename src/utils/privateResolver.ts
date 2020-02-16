/**
 * arrow가 2개 들어간 함수 표기 관련 참고 > https://medium.com/front-end-weekly/javascript-es6-curry-functions-with-practical-examples-6ba2ced003b1
 * @param resolverFunction
 */
const privateResolver = resolverFunction => async (parent, args, context, info) => {
  if (!context.req.user) {
    throw new Error('No JWT. I refuse to proceed');
  }

  if (!context.student) {
    throw new Error('No student');
  }
  const resolved = await resolverFunction(parent, args, context, info);

  return resolved;
};

export default privateResolver;

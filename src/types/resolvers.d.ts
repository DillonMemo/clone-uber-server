// Resolver는 항상 argument들이랑 같이 호출되는데 그 중 하난 'parent', 'args', 'context', 'info'
export type Resolver = (parent: any, args: any, context: any, info: any) => any;

export interface Resolvers {
  [key: string]: {
    [key: string]: Resolver;
  };
}

// example
// const resolvers: Resolvers = {
//     Query: {
//         sayHello: () => {
//             hello: true
//         }
//     }
// }

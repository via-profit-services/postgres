import { GraphQLFieldResolver } from 'graphql';
import { Context } from '@via-profit-services/core';

type Resolvers = {
  Query: {
    test: GraphQLFieldResolver<unknown, Context>;
  };
};

const resolvers: Resolvers = {
  Query: {
    test: async (_parent, _args, context) => {
      const { postgres } = context;

      try {
        const { rows } = await postgres.query('select * from "users" limit 4');

        return rows;
      } catch (err) {
        console.error('catch error', err);
        throw new Error('Something wrong. Try again later.');
      }
    },
  },
};

export default resolvers;

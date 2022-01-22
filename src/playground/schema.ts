import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { JSONScalarType, Context } from '@via-profit-services/core';

const Schema = new GraphQLSchema({
  description: 'Playground schema',
  types: [JSONScalarType],
  query: new GraphQLObjectType<unknown, Context>({
    name: 'Query',
    fields: {
      test: {
        type: new GraphQLNonNull(JSONScalarType),
        resolve: async (_parent, _args, context) => {
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
    },
  }),
});

export default Schema;

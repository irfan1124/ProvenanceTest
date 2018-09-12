

import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import GraphQLJSON from 'graphql-type-json';
import { GraphQLDateTime, GraphQLDate, GraphQLTime } from 'graphql-iso-date';

export default {
    DateTimeCustom: new GraphQLScalarType({
        name: 'DateTimeCustom',
        description: 'DateTime custom scalar type',
        parseValue(value) {
          return new Date(value);; // value from the client
        },
        serialize(value) {
          return new Date(value).toDateString(); // value sent to the client
        },
        parseLiteral(ast) {
            console.log(value)
          if (ast.kind === Kind.INT) {
            return new Date(ast.value); // ast value is always in string format
          }
          return null;
        },
    }),
    Json: GraphQLJSON,
    Date: GraphQLDate,
    Time: GraphQLTime,
    DateTime: GraphQLDateTime,
}

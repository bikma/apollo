const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
  Query: {
    users: () => [{
      id: 1,
      name: 'mk',
      dob: new Date(),
      phone: '9999999999',
    },
    {
      id: 2,
      name: 'bk',
      dob: new Date(),
      phone: '1234567890',
    }]
  },
  Mutation: {
    subscribe: (parent, args, context, info) => {
      // console.log(parent, args, context, info)
      // return new Error("Error")
      return {
        id: 2,
        name: 'bk',
        dob: new Date(),
        phone: '1234567890',
      }
    }
  }
}

module.exports = resolvers

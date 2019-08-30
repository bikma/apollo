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
    vehicles: () => [{
      id: 1,
      registrationNumber: 'AP09GP1234',
      driverName: 'Jems',
      driverPhone: '1234567890',
      reportingTime: new Date()
    },
    {
      id: 2,
      registrationNumber: 'TS09GP4321',
      driverName: 'bond',
      driverPhone: '0987654321',
      reportingTime: new Date()
    }]
  }
}

module.exports = resolvers

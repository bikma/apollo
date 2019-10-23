const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

let users = [{
    id: 0,
    name: 'user 0',
    dob: new Date(),
    phone: '9999999999',
    status: 'IN'
  },
  {
    id: 1,
    name: 'user 1',
    dob: new Date(),
    phone: '1234567890',
    status: 'OUT'
  }]
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
    users: () => {
      let updated = users[Math.floor((Math.random() * users.length -1) + 1)]
      if(updated.status === 'IN')
        updated.status = 'OUT'
      else
        updated.status = 'IN'
      return users
    }
  },
  Mutation: {
    subscribe: (parent, args, context, info) => {
      // console.log(parent, args, context, info)
      users.push({
        id: users.length,
        name: 'user ' + users.length,
        dob: new Date(),
        phone: args.phone,
        status: 'IN'
      })
      return {
        id: users.length,
        name: 'user ' + users.length,
        dob: new Date(),
        phone: args.phone,
        status: 'IN'
      }
    }
  }
}

module.exports = resolvers

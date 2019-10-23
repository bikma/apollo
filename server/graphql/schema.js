const { gql } = require('apollo-server-express')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar Date

  type User {
    id: ID,
    name: String,
    dob: Date,
    phone: String,
    status: String
  }
  type Query {
  	users: [User],    
  }
  type Mutation {
    subscribe (phone: String!): User
  }
`

module.exports = typeDefs

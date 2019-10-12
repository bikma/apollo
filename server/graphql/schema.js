const { gql } = require('apollo-server-express')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar Date

  type File {
    id: ID
    url: String,
    description: String,
    name: String
  }

  type User {
    id: ID,
    name: String,
    dob: Date,
    phone: String,
  }

  type Query {
  	users: [User],
    uploads: [File]
  }

  type Mutation {
    subscribe(phone: String!): User,
    upload(files: [Upload!]!): [File!]!
    predict(file: String!, endpoint: String!): File,
  }
`

module.exports = typeDefs

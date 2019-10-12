const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const fs = require('fs')
const http = require('http')
const path = require('path')

const PORT = 8080
const apollo = new ApolloServer({ typeDefs, resolvers })

const app = express()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

apollo.applyMiddleware({ app })

let server = http.createServer(app)

// Add subscription support
apollo.installSubscriptionHandlers(server)

server.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://0.0.0.0:${PORT}${apollo.graphqlPath}`)
)
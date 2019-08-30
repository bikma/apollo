import ApolloClient from 'apollo-boost'

const Client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
})

export default Client

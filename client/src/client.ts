// import ApolloClient from 'apollo-boost'
import { ApolloClient } from 'apollo-client'
// import { ApolloLink } from 'apollo-link'
// import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'

// const link = ApolloLink.from([
//   new HttpLink({ uri: "http://localhost:8080/graphql" }),
//   createUploadLink()
// ])
const link = createUploadLink({ uri: 'http://localhost:8080/graphql' })
const cache = new InMemoryCache()
const Client = new ApolloClient({ cache, link })

export default Client

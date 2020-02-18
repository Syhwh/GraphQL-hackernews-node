const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')
// // 1

// let links = [{
//   id: 'link-0',
//   url: 'www.howtographql.com',
//   description: 'Fullstack tutorial for GraphQL'
// }]

// // 2
// let idCount = links.length
// const resolvers = {
//   Query: {
//     info: () => `This is the API of a Hackernews Clone`,
//     feed: (root, args, context, info) => {
//       return context.prisma.links()
//     },
//   },
//   Mutation: {
//     post: (root, args, context) => {
//       return context.prisma.createLink({
//         url: args.url,
//         description: args.description,
//       })
//     },
//   },
// }
const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
}
// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))

/*
  "data": {
    "signup": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjazZxd3E0bzZwbDEwMGIwMDhlZmVoemt0IiwiaWF0IjoxNTgxOTcxMDYzfQ.EhJ2Z-UWYFOsqNJFln5DZetvEbh5ws-vKRzBWTisPXI",
      "user": {
        "id": "ck6qwq4o6pl100b008efehzkt"
      }
    }
  }
}
*/
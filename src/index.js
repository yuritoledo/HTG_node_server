const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    info: (_, args) => `Alouuuu ${args.id}`,
    feed: (_, args, context) => {
      return prisma.links()
    }
  },
  Mutation: {
    post(_, { url, description }) {
      const post = prisma.createLink({ url, description })
      return post
    },
    updateLink(_, { id, ...args }) {
      const post = prisma.updateLink({
        data: { ...args },
        where: { id }
      })
      return post
    },
    deleteLink(_, { id }) {
      const post = prisma.deleteLink({ id })
      return post
    }
  },
  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url,
  }
}


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))

const { GraphQLServer } = require('graphql-yoga')
const { importSchema } = require('graphql-import')

const { models } = require('./db')
const resolvers = require('./graphql/resolvers')

const typeDefs = importSchema(`${__dirname}/graphql/schema.graphql`)

const context = {
  models,
};

const Server = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
});

// options
const opts = {
  port: 3333,
};

Server.start(opts, () => {
  console.log(`Server is running on http://localhost:${opts.port}`);
});


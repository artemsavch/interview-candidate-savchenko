import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { connection } from "./connection.js";
import { typeDefs } from './schema.js';

const port = 4000;

export async function serveGraphQl() {
  const resolvers = {
    Query: {
      devices: () => connection.raw("select name from devices"),
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });
  app.listen({ port });

  console.log(
    `GraphQL server ready at http://localhost:${port}${server.graphqlPath}`
  );
}

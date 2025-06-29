import { GraphQLClient } from "graphql-request";

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_PERSONAL_TOKEN;

const client = new GraphQLClient("https://api.github.com/graphql", {
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});

export default client;

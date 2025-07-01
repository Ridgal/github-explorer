import { gql } from "graphql-request";

export const SEARCH_REPOS_QUERY = gql`
  query SearchRepos($username: String!) {
    user(login: $username) {
      repositories(first: 10, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          id
          name
          description
          stargazerCount
          forkCount
          updatedAt
          owner {
            login
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

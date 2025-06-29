import { gql } from "graphql-request";

export const REPO_DETAILS_QUERY = gql`
  query RepoDetails($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      description
      commitActivity: defaultBranchRef {
        target {
          ... on Commit {
            history(first: 30) {
              edges {
                node {
                  committedDate
                }
              }
            }
          }
        }
      }
      issues(
        first: 10
        states: [OPEN, CLOSED]
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        nodes {
          id
          title
          number
          state
          author {
            login
          }
        }
      }
    }
  }
`;

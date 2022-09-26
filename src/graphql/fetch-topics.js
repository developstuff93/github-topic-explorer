import { gql } from "@apollo/client";

export const GET_RELATED_TOPICS = gql`
  query getTopics($name: String!) {
    topic(name: $name) {
      id
      name
      stargazerCount
      relatedTopics {
        id
        name
        stargazerCount
      }
    }
  }
`;

export const GET_TOPIC_STARGAZERS = gql`
  query getTopicStargazers($topic: String!, $limit: Int!) {
    topic(name: $topic) {
      id
      name
      stargazerCount
      stargazers(first: $limit) {
        totalCount
        nodes {
          id
          name
          login
          url
          avatarUrl
          email
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

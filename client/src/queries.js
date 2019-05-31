import { gql } from 'apollo-boost';

// Post Queries
export const GET_POSTS = gql`
  query {
    getPosts {
      _id
      title
      description
      imageUrl
      description
    }
  }
`;

// User Queries

// User Mutations

// Post Mutations
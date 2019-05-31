import { gql } from "apollo-boost";

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
export const SIGN_IN_USER = gql`
  mutation($username: String!, $password: String!) {
    signInUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGN_UP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signInUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
 
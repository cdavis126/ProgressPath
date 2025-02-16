import { gql } from '@apollo/client';

// Query for a specific user by firstName and lastName
export const QUERY_USER = gql`
  query user($firstName: String!, $lastName: String!) {
    user(firstName: $firstName, lastName: $lastName) {
      _id
      firstName
      lastName
      email
    }
  }
`;

// Query for the currently authenticated user
export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
    }
  }
`;

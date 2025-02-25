import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      username
      _id
    }
    token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String, $email: String, $password: String) {
    updateUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      savedIdeas {
        _id
        title
      }
    }
  }
`;

export const SAVE_IDEA = gql`
  mutation saveIdea($ideaId: ID!) {
    saveIdea(ideaId: $ideaId) {
      _id
      savedIdeas {
        _id
        title
        description
        image
        category {
          _id
          name
        }
      }
    }
  }
`;

export const REMOVE_IDEA = gql`
  mutation removeIdea($ideaId: ID!) {
    removeIdea(ideaId: $ideaId) {
      _id
      savedIdeas {
        _id
        title
        description
        image
        category {
          _id
          name
        }
      }
    }
  }
`;

export const DELETE_IDEA = gql`
  mutation deleteIdea($id: ID!) {
    deleteIdea(id: $id) {
      _id
    }
  }
`;

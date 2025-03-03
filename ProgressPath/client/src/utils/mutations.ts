import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        goals {
          _id
          title
          description
          motivation
          status
          category {
            _id
            name
          }
        }
        savedIdeas {
          _id
          title
          description
          motivation
          status
          category {
            _id
            name
          }
        }
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation Logout {
    logout
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($username: String, $email: String) {
    updateUser(username: $username, email: $email) {
      _id
      username
      email
      goals {
        _id
        title
        description
        motivation
        status
        category {
          _id
          name
        }
      }
      savedIdeas {
        _id
        title
        description
        motivation
        status
        category {
          _id
          name
        }
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($currentPassword: String!, $newPassword: String!) {
    updatePassword(currentPassword: $currentPassword, newPassword: $newPassword)
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser
  }
`;

export const SAVE_IDEA = gql`
  mutation SaveIdea($ideaId: ID!) {
    saveIdea(ideaId: $ideaId) {
      _id
      savedIdeas {
        _id
        title
        description
        motivation
        status
        category {
          _id
          name
        }
      }
    }
  }
`;

export const DELETE_IDEA = gql`
  mutation RemoveIdea($ideaId: ID!) {
    removeIdea(ideaId: $ideaId) {
      _id
      savedIdeas {
        _id
        title
        description
        motivation
        status
        category {
          _id
          name
        }
      }
    }
  }
`;




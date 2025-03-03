import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
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
  mutation UpdateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      _id
      goals {
        _id
        title
        description
        motivation
        status
        category {
          _id
          icon
          name
          color
        }
      }
      savedIdeas {
        _id
        title
        description
        category {
          _id
          icon
          name
          color
        }
      }
      hiddenIdeas {
        _id
        title
        description
        category {
          _id
          icon
          name
          color
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
        category {
          _id
          icon
          name
          color
        }
      }
    }
  }
`;

export const HIDE_IDEA = gql`
  mutation HideIdea($ideaId: ID!) {
    hideIdea(ideaId: $ideaId) {
      _id
      hiddenIdeas {
        _id
        title
        description
        category {
          _id
          icon
          name
          color
        }
      }
    }
  }
`;
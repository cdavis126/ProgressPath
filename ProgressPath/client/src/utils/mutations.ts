import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
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
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
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

export const TOGGLE_SAVE_IDEA = gql`
  mutation ToggleSaveIdea($ideaId: ID!) {
    toggleSaveIdea(ideaId: $ideaId) {
      _id
      savedIdeas {
        _id
        title
        description
        category {
          _id
          name
          icon
          color
        }
      }
    }
  }
`;


export const TOGGLE_HIDE_IDEA = gql`
  mutation ToggleHideIdea($ideaId: ID!) {
    toggleHideIdea(ideaId: $ideaId) {
      _id
      hiddenIdeas {
        _id
        title
        description
        category {
          _id
          name
          icon
          color
        }
      }
    }
  }
`;
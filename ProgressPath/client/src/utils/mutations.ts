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
      username
      email
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
  mutation saveIdea($ideaData: IdeaInput!) {
    saveIdea(ideaData: $ideaData) {
      _id
      username
      email
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

export const REMOVE_IDEA = gql`
  mutation removeIdea($ideaId: ID!) {
    removeIdea(ideaId: $ideaId) {
       _id
      username
      email
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

export const CREATE_GOAL = gql`
  mutation CreateGoal($title: String!, $description: String!, $category: String!, $status: String!) {
    createGoal(title: $title, description: $description, category: $category, status: $status) {
      _id
      title
      description
      category
      status
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_GOAL = gql`
mutation UpdateGoal($updateGoalId: ID!, $title: String, $description: String, $category: String, $status: String) {
  updateGoal(id: $updateGoalId, title: $title, description: $description, category: $category, status: $status) {
    _id
    status
    category
    description
    title
  }
}
`;

export const DELETE_GOAL = gql`
  mutation DeleteGoal($id: ID!) {
    deleteGoal(id: $id)
  }
`;
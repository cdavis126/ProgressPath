import { gql } from 'graphql-tag';

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      savedIdeas {
        _id
        title
        description
        image
      }
    }
  }
`;

export const GET_IDEAS = gql`
  query GetIdeas($filter: String, $category: ID) {
    getIdeas(filter: $filter, category: $category) {
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
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        savedIdeas {
          _id
          title
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        savedIdeas {
          _id
          title
        }
      }
    }
  }
`;

export const SAVE_IDEA = gql`
  mutation SaveIdea($ideaData: IdeaInput!) {
    saveIdea(ideaData: $ideaData) {
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

export const REMOVE_IDEA = gql`
  mutation RemoveIdea($ideaId: ID!) {
    removeIdea(ideaId: $ideaId) {
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

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $username: String, $email: String, $password: String) {
    updateUser(userId: $userId, username: $username, email: $email, password: $password) {
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

export const SEARCH_IDEAS = gql`
  query SearchIdeas($searchTerm: String!) {
    searchIdeas(searchTerm: $searchTerm) {
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
`;

import { gql } from 'graphql-tag';

export const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      goals {
        _id
        title
        description
        motivation
        status
        category {
          _id
          name
          icon
          color
        }
      }
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




export const GET_IDEAS = gql`
  query GetIdeas($category: ID) {
    getIdeas(category: $category) {
      _id
      title
      description
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      _id
      name
      icon
      color
    }
  }
`;

export const SEARCH_IDEAS = gql`
  query SearchIdeas($searchTerm: String!) {
    searchIdeas(searchTerm: $searchTerm) {
      _id
      title
      category {
        _id
        name
        icon
        color
      }
    }
  }
`;


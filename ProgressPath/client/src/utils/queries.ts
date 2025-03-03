import { gql } from 'graphql-tag';

export const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      username
      email
      goals {
        _id
        title
        category {
          _id
          name
        }
      }
      savedIdeas {
        _id
        title
        category {
          _id
          name
        }
      }
    }
  }
`;

export const GET_IDEAS = gql`
  query GetIdeas($filter: String, $category: ID) {
    getIdeas(filter: $filter, category: $category) {
      _id
      title
      category {
        _id
        name
      }
    }
  }
`;

export const GET_IDEA = gql`
  query GetIdea($id: ID!) {
    getIdea(id: $id) {
      _id
      title
      category {
        _id
        name
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      _id
      name
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
      }
    }
  }
`;


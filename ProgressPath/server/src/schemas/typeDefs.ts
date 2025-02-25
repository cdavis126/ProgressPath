import { gql } from 'graphql-tag';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    savedIdeas: [Idea]
  }
  type Idea {
    _id: ID!
    title: String!
    description: String!
    image: String!
    category: Category
  }
  type Category {
    _id: ID!
    name: String!
  }
  type Auth {
    token: String!
    user: User!
  }
  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  input IdeaInput {
    _id: ID
    title: String
    description: String
    image: String
    category: ID
  }
  type Query {
    me: User
    getIdeas(filter: String, category: ID): [Idea]
  }
  type Mutation {
    login(email: String!, password: String!): Auth!
    addUser(username: String!, email: String!, password: String!): Auth!
    saveIdea(ideaData: IdeaInput!): User
    removeIdea(ideaId: ID!): User
    updateUser(userId: ID!, username: String, email: String, password: String): User
  }
`;

export default typeDefs;
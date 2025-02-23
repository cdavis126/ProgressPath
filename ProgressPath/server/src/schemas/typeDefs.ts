import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Category {
    _id: ID!
    name: String!
  }
  type IdeaPrompt {
    _id: ID!
    title: String!
    description: String!
    image: String!
    category: Category
    saveIdea: Boolean!
    skipIdea: Boolean!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    savedIdeas: [IdeaPrompt]
    skippedIdeas: [IdeaPrompt]
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
  input IdeaPromptInput {
    title: String!
    description: String!
    image: String!
    categoryId: String!
    saveIdea: Boolean!
    skipIdea: Boolean!
  }

  type Query {
    me: User
    getAllIdeas: [IdeaPrompt]
    getIdeaPromptsByCategory(categoryId: String!): [IdeaPrompt]
  }

  type Mutation {
    login(email: String!, password: String!): Auth!
    addUser(username: String!, email: String!, password: String!): Auth!
    saveIdea(ideaData: IdeaPromptInput!): User
    removeIdea(ideaId: String!): User
    skipIdea(ideaId: String!): User
  }
`;

export default typeDefs;
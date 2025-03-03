const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    savedIdeas: [Idea]
    hiddenIdeas: [Idea]
  }

  type Category {
    _id: ID!
    name: String!
    icon: String!
    color: String!
  }

  type Idea {
    _id: ID!
    title: String!
    description: String!
    category: Category!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type DeleteResponse {
    message: String!
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
  }

  type Query {
    getUser: User
    getIdeas(categoryId: ID): [Idea]!
    getCategories: [Category]!
    searchIdeas(searchTerm: String!): [Idea]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): AuthPayload
    loginUser(email: String!, password: String!): AuthPayload
    updateUser(input: UpdateUserInput!): User
    updatePassword(password: String!): User
    logoutUser: Boolean
    toggleSaveIdea(ideaId: ID!): User
    toggleHideIdea(ideaId: ID!): User
    deleteUser: DeleteResponse
  }
`;

export default typeDefs;

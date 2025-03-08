const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    goals: [Goal]!
    savedIdeas: [Idea]!
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
    category: Category
  }

  type Goal {
    _id: ID!
    title: String!
    description: String!
    category: String!
    status: String!
    user: User!
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

  input CategoryInput {
    _id: ID!
    name: String!
    icon: String!
    color: String!
  }
  input IdeaInput {
    _id: ID!
    title: String!
    description: String!
    category: CategoryInput!
  }

  type Query {
    getUser: User
    getIdeas(category: ID): [Idea]!
    getGoals: [Goal]!
    getCategories: [Category]!
    searchIdeas(searchTerm: String!): [Idea]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): AuthPayload
    loginUser(email: String!, password: String!): AuthPayload
    updateUser(input: UpdateUserInput!): User
    updatePassword(password: String!): User
    logoutUser: Boolean
    saveIdea(ideaData: IdeaInput!): User
    removeIdea(ideaId: ID!): User
    createGoal(title: String!, description: String!, category: String!, status: String!): Goal
    updateGoal(id: ID!, title: String, description: String, category: String, status: String): Goal
    deleteGoal(id: ID!): String
    deleteUser: DeleteResponse
  }
`;

export default typeDefs;

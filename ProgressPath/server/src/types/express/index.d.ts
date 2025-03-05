export interface GraphQLContext {
  user?: {
    _id: string;
    username: string;
    email: string;
  };
}
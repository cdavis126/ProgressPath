import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

// Define types for the arguments
interface AddUserArgs {
  input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  email: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_parent: any, { email }: UserArgs) => {
      return User.findOne({ email });
    },
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const { firstName, lastName, email, password } = input;
      
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new AuthenticationError('Email already in use.');
      }

      // Create the new user
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user.firstName, user.lastName, user.email);
      return { token, user };
    },
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
      const token = signToken(user.firstName, user.lastName, user.email);
      return { token, user };
    },
  },
};

export default resolvers;


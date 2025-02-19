import { User } from '../models/index.js';

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
}
import { signToken, AuthenticationError } from '../utils/auth.js';

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
    users: async (): Promise<IUser[]> => {
      return User.find();
    },
    user: async (_parent: any, { email }: UserArgs): Promise<IUser | null> => {
      return User.findOne({ email });
    },
    me: async (_parent: any, _args: any, context: any): Promise<IUser | null> => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs): Promise<{ token: string, user: IUser }> => {
      const { firstName, lastName, email, password } = input;
      
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new AuthenticationError('Email already in use.');
      }

      // Create the new user
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user.firstName, user.lastName, user.email);
      return { token, user: user.toObject() as IUser };
    },
    login: async (_parent: any, { email, password }: LoginUserArgs): Promise<{ token: string, user: IUser }> => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
      const token = signToken(user.firstName, user.lastName, user.email);
      return { token, user: user.toObject() as IUser };
    },
  },
};

export default resolvers;

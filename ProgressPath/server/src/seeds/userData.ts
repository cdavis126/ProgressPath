import { User } from '../models';
import bcrypt from 'bcryptjs';

export const seedUsers = async (): Promise<void> => {
  try {
    const users = [
      {
        _id: '1',
        username: 'John_Doe',
        email: 'jdoe@example.com',
        password: 'password',
      },
      {
        _id: '2',
        username: 'Taylor123',
        email: 'tsmith@example.com',
        password: 'password',
      },
      {
        _id: '3',
        username: 'Al234',
        email: 'ajohnson@example.com',
        password: 'password',
      },
    ];

    // Hash passwords
    for (const user of users) {
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        console.log(`User already exists: ${user.username}`);
        continue;
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      // Create and save the user
      const newUser = new User({
        ...user,
        password: hashedPassword,
      });

      await newUser.save();
      console.log(`User created: ${user.username}`);
    }

    console.log('User seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

seedUsers();

  
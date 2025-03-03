import mongoose, { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  savedIdeas: mongoose.Types.ObjectId[];
  hiddenIdeas: mongoose.Types.ObjectId[];
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    savedIdeas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Idea",
      },
    ],
    hiddenIdeas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Idea",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<UserDocument>("User", userSchema);
export default User;



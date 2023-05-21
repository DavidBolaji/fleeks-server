import { model, Model, Schema } from "mongoose";
import { hash, compare } from "bcryptjs";
import { IUserDocument } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";

const HASH_ROUNDS = 10;

const userSchema: Schema = new Schema(
  {
    uId: { type: String },
    fname: { type: String, trim: true },
    lname: { type: String, trim: true },
    password: { type: String },
    gender: { type: String },
    phone: { type: String },
    email: { type: String, trim: true, unique: true },
    isAdmin: { type: Boolean, default: false },
    passwordResetToken: { type: String, default: "" },
    passwordResetExpires: { type: Number },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (this: IUserDocument, next: () => void) {
  const hashPassword: string = await hash(this.password as string, HASH_ROUNDS);
  this.password = hashPassword;
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const hashPassword: string = (this as unknown as IUserDocument).password!;
  return compare(password, hashPassword);
};

userSchema.methods.genAuthToken = async function () {
  const user = this;
  const secret: any = process.env.SECRET;
  const token = jwt.sign({ _id: user._id.toString() }, secret);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.hashPassword = async function (
  password: string
): Promise<string> {
  return hash(password, HASH_ROUNDS);
};

const UserModel: Model<IUserDocument> = model<IUserDocument>(
  "User",
  userSchema,
  "User"
);

export { UserModel };

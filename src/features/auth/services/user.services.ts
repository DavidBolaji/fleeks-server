import { hash } from "bcryptjs";
import { IUserDocument } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";
import { ObjectId } from "mongodb";
const HASH_ROUNDS = 10;

class UserService {
  public async createUser(data: IUserDocument): Promise<void> {
    const user: any = new UserModel(data);
    await user.save();
  }

  public async findOneByToken(token: string): Promise<boolean> {
    const user: any = await UserModel.find({ passwordResetToken: token });
    return user.length > 0;
  }

  public async findOne(email: string): Promise<boolean> {
    const user: IUserDocument[] | [] = await UserModel.find({ email });
    return user.length > 0;
  }

  public async findAndReturnUser(email: string): Promise<IUserDocument[]> {
    const user: IUserDocument[] | [] = await UserModel.find({ email });
    return user;
  }

  public async updatePassword(_id: ObjectId, password: string): Promise<void> {
    const pass = await hash(password, HASH_ROUNDS);
    const user = await UserModel.findOneAndUpdate(
      { _id },
      {
        password: pass,
        passwordResetToken: "",
        passwordResetExpires: undefined,
      },
      { new: true }
    );
  }

  public async findOneByTokenAndExpiration(
    token: string
  ): Promise<IUserDocument[]> {
    const user: any = await UserModel.find({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });
    return user;
  }

  public async setResetLink(
    email: string,
    passwordResetToken: string,
    passwordResetExpires: number
  ): Promise<void> {
    const user = await UserModel.findOneAndUpdate(
      { email },
      {
        passwordResetToken,
        passwordResetExpires,
      },
      { new: true }
    );
  }
}

export const userService: UserService = new UserService();

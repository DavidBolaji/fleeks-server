import { IUserDocument } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

class UserService {
  public async createUser(data: IUserDocument): Promise<void> {
    const user: any = new UserModel(data);
    await user.save();
  }

  public async findOne(email: string): Promise<boolean> {
    const user: IUserDocument[] | [] = await UserModel.find({ email });
    return user.length > 0;
  }

  public async findAndReturnUser(email: string): Promise<IUserDocument[]> {
    const user: IUserDocument[] | [] = await UserModel.find({ email });
    return user;
  }
}

export const userService: UserService = new UserService();

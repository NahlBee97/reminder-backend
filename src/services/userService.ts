import { userModel } from "../models/userModel";

export const userService = {
  async getUserById(userId: number) {
    const user = await userModel.findUser(userId);

    if (!user) throw new Error(`User with id ${userId} not found`)
    return user;
  },
};

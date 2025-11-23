import { Request, Response } from "express";
import { userService } from "../services/userService";

export const userController = {
  async getUserById(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);

      const user = await userService.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};

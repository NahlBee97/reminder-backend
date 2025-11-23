import { Router } from "express";
import { userController } from "../controllers/userController";

const router = Router();

router.get("/:id", userController.getUserById);

export default router;
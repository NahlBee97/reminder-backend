import { Router } from "express";
import { reminderController } from "../controllers/reminderController";

const router = Router();

router.get("/", reminderController.getAllReminders);
router.get("/:id", reminderController.getReminderById);
router.post("/", reminderController.createReminder);
router.patch("/:id", reminderController.updateReminder);
router.delete("/:id", reminderController.deleteReminder);

export default router;
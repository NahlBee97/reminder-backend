import { NextFunction, Request, Response } from "express";
import { reminderService } from "../services/reminderService";

export const reminderController = {
  async getAllReminders(req: Request, res: Response, next: NextFunction) {
    try {
      const reminders = await reminderService.getAllReminders();

      res.status(200).json(reminders);
    } catch (error) {
      next(error);
    }
  },

  async getReminderById(req: Request, res: Response, next: NextFunction) {
    try {
      const reminderId = parseInt(req.params.id, 10);

      const reminder = await reminderService.getReminderById(reminderId);
      res.status(200).json(reminder);
    } catch (error) {
      next(error);
    }
  },

  async createReminder(req: Request, res: Response, next: NextFunction) {
    try {
      const newReminder = await reminderService.createReminder(req.body);
      res.status(200).json(newReminder);
    } catch (error) {
      next(error);
    }
  },

  async updateReminder(req: Request, res: Response, next: NextFunction) {
    try {
      const reminderId = parseInt(req.params.id, 10);

      const updatedReminder = await reminderService.updateReminder(
        reminderId,
        req.body
      );
      res.status(200).json(updatedReminder);
    } catch (error) {
      next(error);
    }
  },

  async deleteReminder(req: Request, res: Response, next: NextFunction) {
    try {
      const reminderId = parseInt(req.params.id, 10);

      const reminder = await reminderService.deleteReminder(reminderId);
      res.status(200).json(reminder);
    } catch (error) {
      next(error);
    }
  },
};

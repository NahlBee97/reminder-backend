import { reminderModel } from "../models/reminderModel";
import { customError } from "../utils/customError";

export const reminderService = {
  async getAllReminders() {
    return reminderModel.getAll();
  },

  async getReminderById(reminderId: number) {
    const reminder = await reminderModel.findById(reminderId);

    if (!reminder) throw new customError("Reminder not found", 404);

    return reminder;
  },

  async createReminder(newReminder: any) {
    const { reminder, notes, userId } = newReminder;

    const sanitizeReminder = {
      reminder: reminder?.trim(),
      notes: notes?.trim(),
      userId,
    };

    const createdReminder = await reminderModel.create(sanitizeReminder);
    return createdReminder;
  },

  async updateReminder(reminderId: number, newValues: any) {
    // Build SQL dynamically
    const fields = Object.keys(newValues);
    const setClauses = fields.map((key, index) => `${key} = $${index + 1}`);
    const values = Object.values(newValues);
    values.push(reminderId); // Add ID at the end for WHERE clause

    const query = `
      UPDATE reminders 
      SET ${setClauses.join(", ")}
      WHERE id = $${values.length}
      RETURNING *;
    `;

    const updatedReminder = await reminderModel.update(query, values);
    if (!updatedReminder) throw new customError("Reminder not found", 404);
    return updatedReminder;
  },

  async deleteReminder(reminderId: number) {
    const reminder = await reminderModel.findById(reminderId);

    if (!reminder) {
      throw new customError("Reminder not found", 404);
    }

    const rowCount = await reminderModel.delete(reminderId);

    if (rowCount === 0) {
      throw new customError("Failed to delete the reminder", 500);
    }

    return { message: "Reminder deleted successfully" };
  },
};

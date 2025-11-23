import db from "../config/db";

export const reminderModel = {
  async getAll() {
    const result = await db.query(
      "SELECT * FROM reminders ORDER BY created_at DESC"
    );
    return result.rows;
  },

  async findById(id: number) {
    const result = await db.query("SELECT * FROM reminders WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },

  async create({ reminder, notes, userId }: any) {
    const result = await db.query(
      `
      INSERT INTO reminders (reminder, notes, user_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [reminder, notes, userId]
    );
    return result.rows[0];
  },

  async update(query: string, values: any) {
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async delete(reminderId: number) {
    const result = await db.query("DELETE FROM reminders WHERE id = $1", [
      reminderId,
    ]);
    return result.rowCount;
  },
};

import db from "../config/db";

export const userModel = {
  async findUser(id: number) {
    const result = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);

    return result.rows[0];
  },
};

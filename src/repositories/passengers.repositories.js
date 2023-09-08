import connection from "../database/database.connection.js";

export const PassengerRepository = {
  createPassenger: async (firstName, lastName) => {
    try {
      const query =
        "INSERT INTO passengers (firstname, lastname) VALUES ($1, $2) RETURNING *";
      const values = [firstName, lastName];
      const result = await connection.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

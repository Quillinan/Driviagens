import connection from "../database/database.connection.js";

export const FlightRepository = {
  createFlight: async (origin, destination, date) => {
    try {
      const query =
        "INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3) RETURNING *";
      const values = [origin, destination, date];
      const result = await connection.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

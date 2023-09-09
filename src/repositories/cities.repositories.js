import connection from "../database/database.connection.js";

export const CityRepository = {
  createCity: async (name) => {
    try {
      const checkQuery = "SELECT * FROM cities WHERE name = $1";
      const checkValues = [name];
      const checkResult = await connection.query(checkQuery, checkValues);

      if (checkResult.rowCount > 0) {
        return null;
      }

      const insertQuery = "INSERT INTO cities (name) VALUES ($1) RETURNING *";
      const insertValues = [name];
      const result = await connection.query(insertQuery, insertValues);

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

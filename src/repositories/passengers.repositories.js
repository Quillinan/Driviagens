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
  getPassagersTravels: async (name) => {
    try {
      let query = `
        SELECT (p.firstname || ' ' || p.lastname) AS passenger, COUNT(t.id) AS travels
        FROM passengers p
        LEFT JOIN travels t ON p.id = t.passengerId
      `;

      const values = [];

      if (name) {
        query += ` WHERE (p.firstname || ' ' || p.lastname) ILIKE $1`;
        values.push(`%${name}%`);
      }

      query += `
        GROUP BY passenger
        ORDER BY travels DESC
        LIMIT 10
      `;

      const result = await connection.query(query, values);
      const passengersTravels = result.rows;

      if (passengersTravels.length > 10) {
        throw {
          status: 500,
          message: "Too many results",
        };
      }

      return passengersTravels;
    } catch (error) {
      throw error;
    }
  },
};

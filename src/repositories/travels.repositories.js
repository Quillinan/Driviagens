import connection from "../database/database.connection.js";

export const TravelRepository = {
  createTravel: async (passengerId, flightId) => {
    try {
      const passengerExists = await verifyPassengerExists(passengerId);
      const flightExists = await verifyFlightExists(flightId);

      if (!passengerExists) {
        return {
          status: 404,
          message: "Passageiro inválido",
        };
      }

      if (!flightExists) {
        return {
          status: 404,
          message: "Voo inválido",
        };
      }

      const query =
        "INSERT INTO travels (passengerId, flightId) VALUES ($1, $2) RETURNING *";
      const values = [passengerId, flightId];
      const result = await connection.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

async function verifyPassengerExists(passengerId) {
  try {
    const query = "SELECT COUNT(*) FROM passengers WHERE id = $1";
    const values = [passengerId];
    const result = await connection.query(query, values);

    return result.rows[0].count > 0;
  } catch (error) {
    throw error;
  }
}

async function verifyFlightExists(flightId) {
  try {
    const query = "SELECT COUNT(*) FROM flights WHERE id = $1";
    const values = [flightId];
    const result = await connection.query(query, values);

    return result.rows[0].count > 0;
  } catch (error) {
    throw error;
  }
}

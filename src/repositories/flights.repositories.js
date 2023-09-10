import connection from "../database/database.connection.js";

export const FlightRepository = {
  createFlight: async (origin, destination, date) => {
    try {
      const origemValida = await verificarExistenciaCidade(origin);
      const destinoValido = await verificarExistenciaCidade(destination);

      if (origin === destination) {
        return {
          status: 409,
          message: "Origem e destino devem ser diferentes",
        };
      }

      if (!origemValida) {
        return {
          status: 404,
          message: "Origem inválida",
        };
      }
      if (!destinoValido) {
        return {
          status: 404,
          message: "Destino inválida",
        };
      }

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

async function verificarExistenciaCidade(cityId) {
  try {
    const query = "SELECT COUNT(*) FROM cities WHERE id = $1";
    const values = [cityId];
    const result = await connection.query(query, values);

    return result.rows[0].count > 0;
  } catch (error) {
    throw error;
  }
}

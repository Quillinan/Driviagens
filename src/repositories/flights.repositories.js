import connection from "../database/database.connection.js";
import Joi from "joi";

const dateSchema = Joi.string().pattern(/^\d{2}-\d{2}-\d{4}$/);

async function validateDates(smallerDate, biggerDate) {
  const result = Joi.object({
    smallerDate: dateSchema.required(),
    biggerDate: dateSchema.required(),
  }).validate({ smallerDate, biggerDate });

  if (result.error) {
    return {
      status: 422,
      message: "O formato de data esperado é: dd-mm-aaaa",
    };
  }
}

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
  getFlights: async (origin, destination, smallerDate, biggerDate) => {
    try {
      if ((smallerDate && !biggerDate) || (!smallerDate && biggerDate)) {
        return {
          status: 422,
          message:
            "Ambas as datas (smaller-date e bigger-date) são necessárias.",
        };
      }

      if (smallerDate > biggerDate) {
        return {
          status: 400,
          message: "A smaller-date não pode ser maior do que a bigger-date.",
        };
      }

      const values = [];
      let query = `
        SELECT f.id, o.name AS origin, d.name AS destination, TO_CHAR(f.date, 'dd-MM-yyyy') AS date
        FROM flights f
        JOIN cities o ON f.origin = o.id
        JOIN cities d ON f.destination = d.id
      `;

      if (smallerDate && biggerDate) {
        await validateDates(smallerDate, biggerDate);
        query += ` WHERE f.date >= $1 AND f.date <= $2`;
        values.push(smallerDate, biggerDate);
      }

      if (origin && destination) {
        query += values.length
          ? ` AND o.name = $${values.length + 1} AND d.name = $${
              values.length + 2
            }`
          : ` WHERE o.name = $1 AND d.name = $2`;
        values.push(origin, destination);
      } else if (origin) {
        query += values.length
          ? ` AND o.name = $${values.length + 1}`
          : ` WHERE o.name = $1`;
        values.push(origin);
      } else if (destination) {
        query += values.length
          ? ` AND d.name = $${values.length + 1}`
          : ` WHERE d.name = $1`;
        values.push(destination);
      }

      query += ` ORDER BY f.date ASC`;

      const result = await connection.query(query, values);
      const flights = result.rows;

      return flights;
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

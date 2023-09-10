import FlightService from "../services/flights.services.js";

const flightService = new FlightService();

export const flightController = {
  createFlight: async (req, res) => {
    try {
      const { origin, destination, date } = req.body;

      const result = await flightService.createFlight(
        origin,
        destination,
        date
      );

      if (result.status === 409) {
        res.status(409).json({ error: result.message });
      } else if (result.status === 404) {
        res.status(404).json({ error: result.message });
      } else {
        res.status(201).json(result);
      }
    } catch (error) {
      console.error("Erro ao criar voo:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  getFlights: async (req, res) => {
    try {
      const {
        origin,
        destination,
        "smaller-date": smallerDate,
        "bigger-date": biggerDate,
      } = req.query;
      const flights = await flightService.getFlights(
        origin,
        destination,
        smallerDate,
        biggerDate
      );

      if (flights.status === 422) {
        res.status(422).json({ error: flights.message });
      } else if (flights.status === 400) {
        res.status(400).json({ error: flights.message });
      } else {
        res.status(200).json(flights);
      }
    } catch (error) {
      console.error("Erro ao buscar voos:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};

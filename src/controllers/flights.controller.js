import FlightService from "../services/flights.services.js";

export const flightController = {
  createFlight: async (req, res) => {
    try {
      const { origin, destination, date } = req.body;

      const flightService = new FlightService();
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
};

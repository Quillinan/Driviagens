import FlightService from "../services/flights.services.js";

export const flightController = {
  createFlight: async (req, res) => {
    try {
      const { origin, destination, date } = req.body;

      const flightService = new FlightService();
      const newFlight = await flightService.createFlight(
        origin,
        destination,
        date
      );

      res.status(201).json(newFlight);
    } catch (error) {
      console.error("Erro ao criar voo:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};

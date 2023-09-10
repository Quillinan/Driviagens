import TravelService from "../services/travels.services.js";

export const travelController = {
  createTravel: async (req, res) => {
    try {
      const { passengerId, flightId } = req.body;

      const travelService = new TravelService();
      const result = await travelService.createTravel(passengerId, flightId);

      if (result.status === 404) {
        res.status(404).json({ error: result.message });
      } else {
        res.status(201).json(result);
      }
    } catch (error) {
      console.error("Erro ao criar viagem:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};

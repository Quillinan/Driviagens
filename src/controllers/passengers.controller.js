import PassengerService from "../services/passengers.services.js";

export const passengersController = {
  createPassenger: async (req, res) => {
    try {
      const { firstName, lastName } = req.body;

      // Chame o serviço para criar o passageiro
      const passengerService = new PassengerService();
      const newPassenger = await passengerService.createPassenger(
        firstName,
        lastName
      );

      // Retorne a resposta com o novo passageiro
      res.status(201).json(newPassenger);
    } catch (error) {
      console.error("Erro ao criar passageiro:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};

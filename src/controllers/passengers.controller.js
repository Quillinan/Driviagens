import PassengerService from "../services/passengers.services.js";

const passengerService = new PassengerService();

export const passengersController = {
  createPassenger: async (req, res) => {
    try {
      const { firstName, lastName } = req.body;

      const newPassenger = await passengerService.createPassenger(
        firstName,
        lastName
      );

      res.status(201).json(newPassenger);
    } catch (error) {
      console.error("Erro ao criar passageiro:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  getPassagersTravels: async (req, res) => {
    try {
      const { name } = req.query;
      const passengersTravels = await passengerService.getPassagersTravels(
        name
      );

      if (passengersTravels.status === 422) {
        res.status(422).json({ error: passengersTravels.message });
      } else if (passengersTravels.status === 400) {
        res.status(400).json({ error: passengersTravels.message });
      } else {
        res.status(200).json(passengersTravels);
      }
    } catch (error) {
      console.error(
        "Erro ao obter informações de viagens dos passageiros:",
        error
      );
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};

import CityService from "../services/cities.services.js";

export const citiesController = {
  createCity: async (req, res) => {
    try {
      const { name } = req.body;

      const cityService = new CityService();
      const newCity = await cityService.createCity(name);

      if (newCity === null) {
        res.status(409).json({ error: "Cidade já existe" });
      } else {
        res.status(201).json(newCity);
      }
    } catch (error) {
      console.error("Erro ao criar cidade:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};

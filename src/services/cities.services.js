import { CityRepository } from "../repositories/cities.repositories.js";

class CityService {
  async createCity(name) {
    try {
      const newCity = await CityRepository.createCity(name);
      return newCity;
    } catch (error) {
      throw error;
    }
  }
}

export default CityService;

import { TravelRepository } from "../repositories/travels.repositories.js";

class TravelService {
  async createTravel(passengerId, flightId) {
    try {
      const newTravel = await TravelRepository.createTravel(
        passengerId,
        flightId
      );

      return newTravel;
    } catch (error) {
      throw error;
    }
  }
}

export default TravelService;

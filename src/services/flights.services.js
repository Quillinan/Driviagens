import { FlightRepository } from "../repositories/flights.repositories.js";

class FlightService {
  async createFlight(origin, destination, date) {
    try {
      const newFlight = await FlightRepository.createFlight(
        origin,
        destination,
        date
      );
      return newFlight;
    } catch (error) {
      throw error;
    }
  }
}

export default FlightService;

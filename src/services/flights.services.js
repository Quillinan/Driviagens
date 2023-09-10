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

  async getFlights(origin, destination, smallerDate, biggerDate) {
    try {
      const flights = await FlightRepository.getFlights(
        origin,
        destination,
        smallerDate,
        biggerDate
      );
      return flights;
    } catch (error) {
      throw error;
    }
  }
}

export default FlightService;

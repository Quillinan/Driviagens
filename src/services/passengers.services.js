import { PassengerRepository } from "../repositories/passengers.repositories.js";

class PassengerService {
  async createPassenger(firstName, lastName) {
    try {
      const newPassenger = await PassengerRepository.createPassenger(
        firstName,
        lastName
      );
      return newPassenger;
    } catch (error) {
      throw error;
    }
  }

  async getPassagersTravels(name) {
    try {
      const passengersTravels = await PassengerRepository.getPassagersTravels(
        name
      );
      return passengersTravels;
    } catch (error) {
      throw error;
    }
  }
}

export default PassengerService;

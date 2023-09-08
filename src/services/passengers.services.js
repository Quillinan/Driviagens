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
}

export default PassengerService;

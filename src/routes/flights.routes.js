import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { flightSchema } from "../schemas/flights.schema.js";
import { flightController } from "../controllers/flights.controller.js";

const flightsRouter = Router();

flightsRouter.post(
  "/",
  validateSchema(flightSchema),
  flightController.createFlight
);

export default flightsRouter;

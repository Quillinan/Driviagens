import { Router } from "express";
import { passengersController } from "../controllers/passengers.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { passengersSchema } from "../schemas/passengers.schema.js";

const passengersRouter = Router();

passengersRouter.post(
  "/",
  validateSchema(passengersSchema),
  passengersController.createPassenger
);

export default passengersRouter;

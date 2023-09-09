import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { citiesSchema } from "../schemas/cities.schema.js";
import { citiesController } from "../controllers/cities.controller.js";

const citiesRouter = Router();

citiesRouter.post(
  "/",
  validateSchema(citiesSchema),
  citiesController.createCity
);

export default citiesRouter;

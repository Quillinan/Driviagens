import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { travelsSchema } from "../schemas/travels.schema.js";
import { travelController } from "../controllers/travels.controller.js";

const travelsRouter = Router();

travelsRouter.post(
  "/",
  validateSchema(travelsSchema),
  travelController.createTravel
);

export default travelsRouter;

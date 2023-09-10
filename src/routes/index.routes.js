import { Router } from "express";
import passengersRouter from "./passengers.routes.js";
import citiesRouter from "./cities.routes.js";
import flightsRouter from "./flights.routes.js";
import travelsRouter from "./travels.routes.js";

const router = Router();

router.get("/", (_, res) => {
  res.send("Driviagens vive!!");
});
router.use("/passengers", passengersRouter);
router.use("/cities", citiesRouter);
router.use("/flights", flightsRouter);
router.use("/travels", travelsRouter);

export default router;

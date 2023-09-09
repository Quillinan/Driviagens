import { Router } from "express";
import passengersRouter from "./passengers.routes.js";
import citiesRouter from "./cities.routes.js";

const router = Router();

router.get("/", (_, res) => {
  res.send("Driviagens vive!!");
});
router.use("/passengers", passengersRouter);
router.use("/cities", citiesRouter);
//router.use("/flights", );
//router.use("/travels", );

export default router;

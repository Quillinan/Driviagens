import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.send("Driviagens vive!!");
});
//router.use("/passengers", );
//router.use("/cities", );
//router.use("/flights", );
//router.use("/travels", );

export default router;

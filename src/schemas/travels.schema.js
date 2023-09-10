import Joi from "joi";

export const travelsSchema = Joi.object({
  passengerId: Joi.number().min(1).required(),
  flightId: Joi.number().min(1).required(),
});

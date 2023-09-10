import Joi from "joi";

export const flightSchema = Joi.object({
  origin: Joi.number().integer().min(1).required(),
  destination: Joi.number().integer().min(1).required(),
  date: Joi.string()
    .pattern(/^(\d{2}-\d{2}-\d{4})$/)
    .required(),
}).options({ abortEarly: false });

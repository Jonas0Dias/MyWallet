import Joi from "joi";

export const newEntryOrExit = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().required(),
    type: Joi.string().valid("exit", "entry").required()
  });
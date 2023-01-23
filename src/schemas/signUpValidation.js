 import Joi from "joi";
 
 export const signUpValidation = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    passwordConfirmation: Joi.string().valid(Joi.ref("password")).required()
  });
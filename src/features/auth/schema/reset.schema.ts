import Joi, { ObjectSchema } from "joi";

const resetSchema: ObjectSchema = Joi.object().keys({
  password: Joi.string().required().min(8).messages({
    "string.base": "Password must be of type string",
    "string.min": "Invalid password",
    "string.empty": "Password is a required field",
  }),
  token: Joi.string().required(),
});

export { resetSchema };

import Joi, { ObjectSchema } from "joi";

const signinSchema: ObjectSchema = Joi.object().keys({
  password: Joi.string().required().min(8).messages({
    "string.base": "Password must be of type string",
    "string.min": "Invalid password",
    "string.empty": "Password is a required field",
  }),
  email: Joi.string().required().email().messages({
    "string.base": "Email must be of type string",
    "string.min": "Invalid password",
    "string.empty": "Email is a required field",
  }),
});

export { signinSchema };

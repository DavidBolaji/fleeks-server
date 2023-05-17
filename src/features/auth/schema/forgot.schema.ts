import Joi, { ObjectSchema } from "joi";

const forgotSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string().required().email().messages({
    "string.base": "Email must be of type string",
    "string.min": "Invalid password",
    "string.empty": "Email is a required field",
  }),
});

export { forgotSchema };

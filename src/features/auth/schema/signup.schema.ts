import Joi, { ObjectSchema } from "joi";

const signupSchema: ObjectSchema = Joi.object().keys({
  fname: Joi.string().required().min(3).messages({
    "string.base": "First name must be of type string",
    "string.min": "Invalid first name",
    "string.empty": "Firstname is a required field",
  }),
  lname: Joi.string().required().min(3).messages({
    "string.base": "Last Name must be of type string",
    "string.min": "Invalid last name",
    "string.empty": "Last Name is a required field",
  }),
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
  gender: Joi.string().required().messages({
    "string.base": "Gender must be of type string",
    "string.empty": "Gender is a required field",
  }),
  phone: Joi.string().required().messages({
    "string.base": "Phone number must be of type string",
    "string.empty": "Phone is a required field",
  }),
  isAdmin: Joi.boolean().default(false),
});

export { signupSchema };

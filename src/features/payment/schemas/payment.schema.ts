import Joi, { ObjectSchema } from "joi";

const orderSchema: ObjectSchema = Joi.object().keys({
  _id: Joi.any().messages({
    "string.base": "_id product must be of type Object",
  }),
  user: Joi.string().required().messages({
    "string.base": "user id must be of type string",
    "string.empty": "user id is required",
  }),
  email: Joi.string().required().email().messages({
    "string.base": "Email must be of type string",
    "string.empty": "Email is a required field",
  }),
  address: Joi.string().required().messages({
    "string.base": "Address must be of type string",
    "string.empty": "Address is a required field",
  }),
  product: Joi.array().required().messages({
    "string.base": "Address must be of type string",
    "string.empty": "Address is a required field",
  }),
  phone: Joi.string().required().messages({
    "string.base": "Phone number must be of type string",
    "string.empty": "Phone is a required field",
  }),
  price: Joi.number().required().messages({
    "string.base": "Price must be of type number",
    "string.empty": "Price is a required field",
  }),
  paid: Joi.boolean().required().messages({
    "string.base": "Paid field must be of type boolean",
    "string.empty": "Paid field is a required field",
  }),
  status: Joi.string().required().messages({
    "string.base": "Paid field must be of type string",
    "string.empty": "Paid field is a required field",
  }),
  delivered: Joi.boolean().required().messages({
    "string.base": "Delivered must be of type boolean",
    "string.empty": "Delivered is a required field",
  }),
});

export { orderSchema };

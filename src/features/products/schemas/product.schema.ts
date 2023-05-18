import Joi, { ObjectSchema } from "joi";

const productSchema: ObjectSchema = Joi.object().keys({
  _id: Joi.any().messages({
    "string.base": "_id product must be of type Object",
  }),
  title: Joi.string().required().messages({
    "string.base": "Title for product must be of type string",
    "string.empty": "Title for product is a required field",
  }),
  amount: Joi.number().required().messages({
    "string.base": "Amount must be of type Number",
    "string.empty": "Amount is a required field",
  }),
  img: Joi.string().messages({
    "string.base": "Image must be of type string",
  }),
});

export { productSchema };

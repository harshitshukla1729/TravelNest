const Joi = require("joi");

const listingValidationSchema = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().allow("", null),
  description: Joi.string().required(),
  price: Joi.number().required().min(0),
  location: Joi.string().required(),
  country: Joi.string().required(),
});

const reviewValidationSchema = Joi.object({
  rating: Joi.number().required().min(1).max(5),
  comment: Joi.string().required(),
});

module.exports = {
  listingValidationSchema,
  reviewValidationSchema
};

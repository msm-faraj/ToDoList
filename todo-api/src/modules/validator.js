const Joi = require("joi");

module.exports = (reqBody) => {
  const schema = {
    name: Joi.string().min(3).max(256).required(),
    isDone: Joi.boolean(),
  };
  return Joi.validate(reqBody, schema);
};

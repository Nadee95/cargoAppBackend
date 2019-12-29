const joi = require("@hapi/joi");

const registerValidation = data => {
  const schema = joi.object({
    name: joi
      .string()
      .min(3)
      .required(),

    username: joi
      .string()
      .min(6)
      .required(),

    email: joi
      .string()
      .min(6)
      .required()
      .email(),
    password: joi
      .string()
      .min(6)
      .required(),
    role: joi
      .number()
      .min(1)
      .max(1)
  });
  return schema.validate(data);
};

const loginValidation = data => {
  const schema = joi.object({
    email: joi
      .string()
      .min(6)
      .required()
      .email(),

    password: joi
      .string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};

const cargoRequestValidation = data => {
  const schema = joi.object({
    cargo_type: joi
      .string()
      .min(2)
      .required(),

    volume: joi
      .string()
      .min(1)
      .required(),

    on_time: joi.date().required(),

    due_time: joi.date().required(),
    user_location: joi.any(),
    destination: joi.any(),
    driver_id: joi.any() /// type?
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.cargoRequestValidation = cargoRequestValidation;

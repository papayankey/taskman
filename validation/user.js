const Joi = require("@hapi/joi");

const email = Joi.string()
  .email()
  .required()
  .label("Email");

const password = Joi.string()
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  .required()
  .label("Password")
  .options({
    language: {
      string: {
        regex: {
          base: "minimum eight characters, at least one letter and one number"
        }
      }
    }
  });

const name = Joi.string()
  .min(8)
  .max(30)
  .required()
  .label("Name");

const loginSchema = Joi.object().keys({
  email,
  password
});

const registerSchema = Joi.object().keys({
  name,
  email,
  password
});

module.exports = { loginSchema, registerSchema };

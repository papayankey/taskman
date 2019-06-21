const Joi = require("@hapi/joi");

const loginSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .label("Email"),
  password: Joi.string()
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
    })
});

const registerSchema = loginSchema.keys({
  name: Joi.string()
    .min(8)
    .max(30)
    .required()
    .label("Name")
});

module.exports = { loginSchema, registerSchema };

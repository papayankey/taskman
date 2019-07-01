const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const { loginSchema, registerSchema } = require("../validation/user");

module.exports = {
  getRegister: function(req, res) {
    // redirect to task
    if (req.session.user) {
      res.redirect("../task");
      return;
    }

    res.render("partials/content/register", {
      title: "CREATE ACCOUNT",
      pageId: "Register"
    });
  },
  getLogin: function(req, res) {
    // redirect to task
    if (req.session.user) {
      res.redirect("../task");
      return;
    }

    res.render("partials/content/login", {
      title: "ACCESS ACCOUNT",
      pageId: "Login"
    });
  },
  getSignOut: async function(req, res) {
    const success = await req.session.destroy();
    if (success) {
      res.status(200);
      res.redirect("/");
    }
  },
  postRegister: async function(req, res) {
    const models = req.app.locals.models;

    let { name, email, password } = req.body;

    // validation
    try {
      await Joi.validate({ name, email, password }, registerSchema, {
        abortEarly: false
      });
    } catch (e) {
      res.render("partials/content/register", {
        title: "CREATE ACCOUNT",
        pageId: "Register",
        errors: e.details
      });
      return;
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      await models.User.create(name, email, hashedPassword);
      res.render("partials/content/register", {
        title: "CREATE ACCOUNT",
        pageId: "Register",
        success: true
      });
      return;
    } catch (e) {
      res.render("partials/content/register", {
        title: "CREATE ACCOUNT",
        pageId: "Register",
        errors: [{ message: '"Email" already exists' }]
      });
    }
  },
  postLogin: async function(req, res) {
    const models = req.app.locals.models;

    let { email, password } = req.body;

    // validation
    try {
      await Joi.validate({ email, password }, loginSchema, {
        abortEarly: false
      });
    } catch (e) {
      res.render("partials/content/login", {
        title: "ACCESS ACCOUNT",
        pageId: "Login",
        errors: e.details
      });
      return;
    }

    try {
      const renderError = () => {
        res.status(500);
        res.render("partials/content/login", {
          title: "ACCESS ACCOUNT",
          pageTitle: "Login",
          errors: [{ message: "Email or password incorrect" }]
        });
      };

      // find user by email
      const user = await models.User.findByEmail(email);

      // error message
      if (!user) {
        renderError();
        return;
      }

      // compare passwords
      const valid = await bcrypt.compare(password, user.password);

      // error message
      if (!valid) {
        renderError();
        return;
      }

      // set user session
      req.session.user = {
        id: user.id,
        name: user.name
      };

      // redirect to task page
      res.redirect("../task");
      return;
    } catch (e) {
      renderError();
    }
  }
};

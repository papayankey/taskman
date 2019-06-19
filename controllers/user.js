const bcrypt = require("bcrypt");

module.exports = {
  register: async function(req, res) {
    const models = req.app.locals.models;

    let { name, email, password } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      await models.User.create(name, email, hashedPassword);
      res.status(200);
      res.redirect("./account-created");
      return;
    } catch (e) {
      res.status(500);
      res.render("partials/content/register", {
        title: "CREATE ACCOUNT",
        pageTitle: "Register",
        errors: [{ field: "Email", message: "Email already exist" }]
      });
    }
  },
  login: async function(req, res) {
    const models = req.app.locals.models;

    let { email, password } = req.body;

    try {
      const renderError = () => {
        res.status(500);
        res.render("partials/content/login", {
          title: "ACCESS ACCOUNT",
          pageTitle: "Login",
          errors: [{ message: "Email or password incorrect" }]
        });
      };

      // get user from db by email
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
      res.status(200);
      res.redirect("../task");
      return;
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Email or password incorrect"
      });
    }
  }
};

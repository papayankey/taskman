module.exports = {
  register: async function(req, res) {
    const models = req.app.locals.models;

    let { name, email, password } = req.body;

    try {
      await models.User.create(name, email, password);
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
  }
};

module.exports = {
  register: async function (req, res) {
    const models = req.app.locals.models;

    let { name, email, password } = req.body;

    try {
      await models.User.create(name, email, password);
      res.status(200);
      res.render("registerRedirect", { title: "Registration Complete" });
    } catch (e) {
      res.status(500);
      res.render("registerForm", { error: { message: "Email already exist" } });
    }
  }
};
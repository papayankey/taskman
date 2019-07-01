const modifyName = require("../helpers/firstToCapitalize");

module.exports = {
  getAllTask: async function(req, res) {
    if (req.session.user) {
      let { name } = req.session.user;
      name = await modifyName(name);

      const models = req.app.locals.models;

      // get all tasks
      try {
        const tasks = await models.Task.findAll();
        res.render("task", {
          pageId: "Task",
          user: {
            name
          },
          tasks
        });
        return;
      } catch (e) {
        console.log(e);
      }
    }
    res.redirect("/user/signup");
  },
  createTask: async function(req, res) {
    if (req.session.user) {
      let { id } = req.session.user;

      const models = req.app.locals.models;

      const { task_text, band, completed, priority } = req.body;

      try {
        await models.Task.create(task_text, id, band, priority, completed);
        res.redirect("../");
        return;
      } catch (e) {
        console.log(e);
      }
    }
  },
  removeTask: async function(req, res) {
    if (req.session.user) {
      const id = req.params.id;

      const models = req.app.locals.models;

      try {
        const result = await models.Task.findOneAndRemove(id);
        res.redirect("/task");
        return;
      } catch (e) {
        console.log(e);
      }
    }
  }
};

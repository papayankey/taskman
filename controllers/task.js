const capitalizeFirst = require("../utils/firstToCapitalize");

module.exports = {
  getAll: async function(req, res) {
    let { id: userId, name } = req.session.user;
    name = await capitalizeFirst(name);

    const models = req.app.locals.models;

    // get all tasks
    try {
      const tasks = (await models.Task.findAll(userId)) || [];
      res.render("tasks", {
        pageId: "Task",
        user: {
          name
        },
        tasks
      });
    } catch (e) {}
  },
  getAllCompleted: async function(req, res) {
    let { id: userId, name } = req.session.user;
    name = await capitalizeFirst(name);

    const models = req.app.locals.models;
    const completedValue = 1;

    try {
      const tasks =
        (await models.Task.findByCompleted(userId, completedValue)) || [];
      res.render("partials/content/taskList", {
        pageId: "Task",
        pageExtends: "CompletedTask",
        user: {
          name
        },
        tasks
      });
    } catch (e) {}
  },
  getAllActive: async function(req, res) {
    let { id: userId, name } = req.session.user;
    name = await capitalizeFirst(name);

    const models = req.app.locals.models;
    const completedValue = 0;

    try {
      const tasks =
        (await models.Task.findByCompleted(userId, completedValue)) || [];
      res.render("partials/content/taskList", {
        pageId: "Task",
        pageExtends: "ActiveTask",
        user: {
          name
        },
        tasks
      });
    } catch (e) {}
  },
  addTask: async function(req, res) {
    let { id } = req.session.user;

    const models = req.app.locals.models;

    const { task_text, band, completed, priority } = req.body;

    try {
      await models.Task.create(task_text, id, band, priority, completed);
      res.redirect("../");
    } catch (e) {}
  },
  destroyTask: async function(req, res) {
    let { id: userId } = req.session.user;
    const taskId = req.body.id;

    const models = req.app.locals.models;

    try {
      const result = await models.Task.findOneAndRemove(userId, taskId);
      res.json({ result });
    } catch (e) {}
  },
  destroyAllActive: async function(req, res) {
    let { id: userId } = req.session.user;

    const models = req.app.locals.models;
    const active = 0;

    try {
      const result = await models.Task.findAndRemoveAll(userId, active);
      res.json({ result });
    } catch (e) {}
  },
  destroyAllCompleted: async function(req, res) {
    let { id: userId } = req.session.user;

    const models = req.app.locals.models;
    const completed = 1;

    try {
      const result = await models.Task.findAndRemoveAll(userId, completed);
      res.json({ result });
    } catch (e) {}
  },
  destroyAllActiveToday: async function(req, res) {
    let { id: userId } = req.session.user;

    const models = req.app.locals.models;
    const active = 0;

    try {
      const result = await models.Task.findAndRemoveAllToday(userId, active);
      res.json({ result });
    } catch (e) {}
  },
  destroyAllActiveYesterday: async function(req, res) {
    let { id: userId } = req.session.user;

    const models = req.app.locals.models;
    const active = 0;

    try {
      const result = await models.Task.findAndRemoveAllYesterday(
        userId,
        active
      );
      res.json({ result });
    } catch (e) {}
  },
  destroyAllActivePast: async function(req, res) {
    let { id: userId } = req.session.user;

    const models = req.app.locals.models;
    const active = 0;

    try {
      const result = await models.Task.findAndRemoveAllPast(userId, active);
      res.json({ result });
    } catch (e) {}
  },
  destroyAllCompletedToday: async function(req, res) {
    let { id: userId } = req.session.user;

    const models = req.app.locals.models;
    const completed = 1;

    try {
      const result = await models.Task.findAndRemoveAllToday(userId, completed);
      res.json({ result });
    } catch (e) {}
  },
  destroyAllCompletedYesterday: async function(req, res) {
    let { id: userId } = req.session.user;

    const models = req.app.locals.models;
    const completed = 1;

    try {
      const result = await models.Task.findAndRemoveAllYesterday(
        userId,
        completed
      );
      res.json({ result });
    } catch (e) {}
  },
  destroyAllCompletedPast: async function(req, res) {
    let { id: userId } = req.session.user;

    const models = req.app.locals.models;
    const completed = 1;

    try {
      const result = await models.Task.findAndRemoveAllPast(userId, completed);
      res.json({ result });
    } catch (e) {}
  },
  taskDone: async function(req, res) {
    let { id: userId } = req.session.user;
    const taskId = req.body.id;

    const models = req.app.locals.models;

    try {
      const result = await models.Task.findOneAndComplete(userId, taskId);
      res.json({ result });
    } catch (e) {}
  },
  redoTask: async function(req, res) {
    let { id: userId } = req.session.user;
    const taskId = req.body.id;

    const models = req.app.locals.models;

    try {
      const result = await models.Task.findOneAndRedo(userId, taskId);
      res.json({ result });
    } catch (e) {}
  },
  updateTask: async function(req, res) {
    let { id: userId } = req.session.user;

    const models = req.app.locals.models;

    try {
      const result = await models.Task.findOneAndUpdate({
        userId,
        ...req.body
      });
      console.log(result);
      res.redirect("..");
    } catch (e) {
      console.log(e);
    }
  }
};

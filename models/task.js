class TaskModel {
  constructor(dao) {
    this.dao = dao;
  }

  create(...params) {
    const sql = `
      INSERT INTO task(task_text, user_id, band_id, priority_id, task_completed ) 
      VALUES (?, ?, ?, ?, ?)
    `;
    return this.dao.run(sql, params);
  }

  findAll() {
    const sql = `
      SELECT task_id, task_text, b.band_hex, p.priority_value, task_completed
      FROM task as t, band as b, priority as p
      WHERE t.band_id = b.band_id AND t.priority_id = p.priority_id
      ORDER BY t.created_at DESC;
    `;
    return this.dao.getAll(sql);
  }

  findOneAndRemove(param) {
    const sql = `
      DELETE FROM task WHERE task.task_id = ?
    `;
    return this.dao.run(sql, param);
  }

  findById(param) {
    const sql = `SELECT * FROM user WHERE user.id = ?`;
    return this.dao.get(sql, param);
  }
}

module.exports = TaskModel;

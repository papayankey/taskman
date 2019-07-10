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

  findAll(param) {
    const sql = `
      SELECT task_id, task_text, b.band_id, b.band_hex, p.priority_id, p.priority_value, task_completed, t.updated_at
      FROM task as t, band as b, priority as p
      WHERE t.band_id = b.band_id AND t.priority_id = p.priority_id AND t.user_id = ?
        ORDER BY t.updated_at DESC;
    `;
    return this.dao.getAll(sql, param);
  }

  findByCompleted(...params) {
    const sql = `
      SELECT task_id, task_text, b.band_id, b.band_hex, p.priority_id, p.priority_value, task_completed, t.updated_at
      FROM task as t, band as b, priority as p
      WHERE t.band_id = b.band_id AND t.priority_id = p.priority_id AND t.user_id = ? AND task_completed = ?
        ORDER BY t.updated_at DESC;
    `;
    return this.dao.getAll(sql, params);
  }

  findOneAndRemove(...params) {
    const sql = `
      DELETE FROM task WHERE user_id = ? AND task_id = ?
    `;
    return this.dao.run(sql, params);
  }

  findOneAndUpdate({ userId, task_id, task_text, band, priority, completed }) {
    const params = {
      $userId: userId,
      $taskId: task_id,
      $text: task_text,
      $band: band,
      $priority: priority,
      $completed: completed
    };
    const sql = `
      UPDATE task 
      SET 
        task_text = $text, 
        band_id = $band, 
        priority_id = $priority, 
        task_completed = $completed, 
        updated_at = datetime('now') 
      WHERE user_id = $userId  AND task_id = $taskId`;
    return this.dao.run(sql, params);
  }

  // destroy all (active || completed)
  findAndRemoveAll(...params) {
    const sql = `
      DELETE FROM task WHERE user_id = ? AND task_completed = ?
    `;
    return this.dao.run(sql, params);
  }

  // destroy all (active || completed) today
  findAndRemoveAllToday(...params) {
    const sql = `
      DELETE FROM task 
      WHERE user_id = ? 
        AND task_completed = ? 
        AND date(updated_at) = date('now')
    `;
    return this.dao.run(sql, params);
  }

  // destroy all (active || completed) yesterday
  findAndRemoveAllYesterday(...params) {
    const sql = `
      DELETE FROM task 
      WHERE user_id = ? 
        AND task_completed = ? 
        AND date(updated_at) = date('now', '-1 day')
    `;
    return this.dao.run(sql, params);
  }

  // destroy all (active || completed) past
  findAndRemoveAllPast(...params) {
    const sql = `
      DELETE FROM task 
      WHERE user_id = ? 
        AND task_completed = ? 
        AND round(julianday('now') - julianday(updated_at)) > 1.0
    `;
    return this.dao.run(sql, params);
  }

  findOneAndComplete(...params) {
    const sql = `
      UPDATE task 
      SET task_completed = 1, updated_at = datetime('now')
      WHERE user_id = ? AND task_id = ?
    `;
    return this.dao.run(sql, params);
  }

  findOneAndRedo(...params) {
    const sql = `
      UPDATE task 
      SET task_completed = 0, created_at = datetime('now'), updated_at = datetime('now')
      WHERE user_id = ? AND task_id = ?
    `;
    return this.dao.run(sql, params);
  }
}

module.exports = TaskModel;

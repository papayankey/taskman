class UserModel {
  constructor(dao) {
    this.dao = dao;
  }

  create(...params) {
    const sql = `INSERT INTO user(name, email, password) VALUES (?, ?, ?)`;
    return this.dao.run(sql, params);
  }

  findById(param) {
    const sql = `SELECT * FROM user WHERE user.id = ?`;
    return this.dao.get(sql, param);
  }

  findByEmail(param) {
    const sql = `SELECT * FROM user WHERE user.email = ?`;
    return this.dao.get(sql, param);
  }
}

module.exports = UserModel;

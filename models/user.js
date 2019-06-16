class UserModel {
  constructor(dao) {
    this.dao = dao;
  }

  create(...params) {
    const sql = `INSERT INTO Users(name, email, password) VALUES (?, ?, ?)`;
    return this.dao.run(sql, params);
  }

  findById(param) {
    const sql = `SELECT * FROM Users WHERE Users.id = ?`;
    return this.dao.get(sql, param);
  }
}

module.exports = UserModel;
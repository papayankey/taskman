const sqlite3 = require("sqlite3").verbose();

// Database API
class Database {
  constructor(DB_PATH, schema) {
    // connect db
    this.db = new sqlite3.Database(DB_PATH);

    // pragmas
    this.db.exec(
      `
      PRAGMA foreign_keys=ON;
      PRAGMA busy_timeout=30000;
    `,
      function(err) {
        if (err) {
          console.log(err);
        }
      }
    );

    // create tables
    this.db.exec(schema.tablesSchema, function(err) {
      if (err) {
        console.log(err);
        console.log("Error creating table");
      }
    });

    // tables default inserts
    this.db.exec(schema.defaultInsert, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }

  // INSERT, UPDATE, DELETE
  // INSERT: lastID is valid
  // UPDATE AND DELETE: changes is valid
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          const lastID = this.lastID;
          const changes = this.changes;
          resolve({ lastID, changes });
        }
      });
    });
  }

  // GET SINGLE RECORD
  get(sql, param) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, param, function(err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // GET ALL RECORD
  getAll(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, function(err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = Database;

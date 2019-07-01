const schema = `
  CREATE TABLE IF NOT EXISTS user ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS task (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_text TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    band_id INTEGER NOT NULL,
    priority_id INTEGER NOT NULL,
    task_completed BOOLEAN NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES user(id),
      FOREIGN KEY(band_id) REFERENCES band(band_id),
      FOREIGN KEY(priority_id) REFERENCES priority(priority_id)
  );

  CREATE TABLE IF NOT EXISTS band (
    band_id INTEGER PRIMARY KEY AUTOINCREMENT,
    band_name TEXT,
    band_hex TEXT
  );

  CREATE TABLE IF NOT EXISTS priority (
    priority_id INTEGER PRIMARY KEY AUTOINCREMENT,
    priority_value TEXT
  );
`;

module.exports = schema;

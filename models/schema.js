const tablesSchema = `
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
    band_name TEXT UNIQUE,
    band_hex TEXT UNIQUE
  );

  CREATE TABLE IF NOT EXISTS priority (
    priority_id INTEGER PRIMARY KEY AUTOINCREMENT,
    priority_value TEXT UNIQUE
  );
`;

const defaultInsert = `
  INSERT OR REPLACE INTO band (band_name, band_hex)
    VALUES ("lightskyblue", "#87CEFA"), ("lightsalmon", "#FFA07A"), ("paleturquoise",   "#AFEEEE"), ("lightpink", "#FFB6C1"), ("palegreen", "#98FB98"), ("white", "#FFFFFF"),   ("lightgray", "#D3D3D3")
      ON CONFLICT(band_name) DO NOTHING;

  INSERT OR REPLACE INTO priority (priority_value)
    VALUES ("low"), ("normal"), ("high"), ("none")
      ON CONFLICT(priority_value) DO NOTHING;
`;

module.exports = { tablesSchema, defaultInsert };

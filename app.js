const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const path = require("path");
const Database = require("./models/database");
const schema = require("./models/schema");

const UserModel = require("./models/user");
const indexRoute = require("./routes/index");
const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");

// environment variables
const { DB_PATH, APP_PORT, SESSION_NAME, SESSION_SECRET } = require("./config");

// connect db (Dao = Database Access Object)
const Dao = new Database(DB_PATH, schema);

Dao.db
  .on("error", error => {
    console.log(error.message);
  })
  .on("open", async () => {
    console.log("Database connection successful");

    // models
    const User = new UserModel(Dao);

    // app
    const app = express();

    // set app locals to access models
    app.locals.models = { User };

    // sqlite session store
    const store = new SQLiteStore({
      table: "userSessions",
      dir: "./db"
    });

    // middlewares
    app.disable("x-powered-by");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
      session({
        store,
        name: SESSION_NAME,
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        }
      })
    );
    app.use(express.static(path.resolve(__dirname, "public")));
    app.set("view engine", "pug");

    // routes
    app.use("/", indexRoute);
    app.use("/user", userRoute);
    app.use("/task", taskRoute);

    // listen to port
    app.listen(APP_PORT, () => {
      console.log(`server running on http://localhost:${APP_PORT}`);
    });
  });

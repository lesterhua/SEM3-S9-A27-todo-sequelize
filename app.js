const express = require("express");
const app = express();

const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");

const port = 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "fefwefewf",
    resave: "false",
    saveUninitialized: "false"
  })
);

const db = require("./models");
const Todo = db.Todo;
const User = db.User;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use("/users", require("./routes/user"));

app.listen(port, () => {
  console.log(`App is running on : localhost:${port}`);
});

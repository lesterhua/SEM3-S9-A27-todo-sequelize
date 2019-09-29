const express = require("express");
const app = express();
const flash = require('connect-flash')

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}

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
//使用connect-flash
app.use(flash())

const db = require("./models");
const Todo = db.Todo;
const User = db.User;



app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated()// 辨識使用者是否已經登入的變數，讓 view 可以使用

  //新增flash message 變數
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next();
});

app.use('/', require('./routes/home'))
app.use("/users", require("./routes/user"))
app.use('/todos', require('./routes/todo'))
app.use('/auth', require('./routes/auths'))



app.listen(port, () => {
  console.log(`App is running on : localhost:${port}`);
});

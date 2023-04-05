const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
// const authRoutes = require('./routes/authRoutes.js');
const exerciseRoutes = require('./routes/exerciseRoutes.js')
var path = require('path');
const port = process.env.PORT || 8000;

//bootstrap
app.use(express.static(path.join(_dirname, 'node_modules/bootstrap/dist/css')))
app.use(express.static(path.join(_dirname, 'node_modules/bootstrap/dist/js')))
app.use( express.static(path.join(_dirname, 'node_modules/jquery/dist')))
app.use( express.static(path.join(_dirname, 'node_modules/bootstrap/dist/css')))
app.use('../assets/vendor/bootstrap-icons', express.static(path.join(_dirname, '../assets/vendor/bootstrap-icons')))
app.use(express.static(path.join(_dirname,'node_modules/jquery/dist')))
app.use(express.static(path.join(_dirname,'../assets')));
app.use(express.static(path.join(_dirname,'node_modules/bootstrap/dist/js')))
app.use(express.static(path.join(_dirname,'./assets/vendor/glightbox/js')));
app.use( express.static(path.join(_dirname,'../assets/vendor/aos')));
app.use( express.static(path.join(_dirname,'../assets/purecounter')));
app.use( express.static(path.join(_dirname,'../assets/vendor/swiper')));
app.use( express.static(path.join(_dirname,'../assets/isotope-layout')));
app.use( express.static(path.join(_dirname,'../assets/php-email-form')));
app.use( express.static(path.join(_dirname,'../assets/js')));
app.use( express.static(path.join(_dirname,'../assets/vendor/bootstrap-icons')));
app.use(express.static(path.join(_dirname,'../assets/css')));
app.use(express.static(path.join(_dirname,'../assets/img')));
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// middleware to save data and cookie sessions
app.use(cookieParser('RemindDatabaseSecure'))
app.use(cors())

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
// app.use("/auth", authRoutes);
app.use("/remind", exerciseRoutes);

//Server Running

app.listen(port, () => {
  console.log("Server is running, you better catch it!");
});


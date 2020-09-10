const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const util = require("util");
const mysql = require("mysql"); // donne accé a la base de donnée
const path = require("path"); // utilise les fichiers
const methodOverride = require('method-override'); // pouvoir transformer le nom des methodes dans Node
const fileUpload = require ('express-fileupload');
const bcrypt = require('bcrypt');
const app = express();
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require ('./routes/auth');


// Express-session
app.use(session({
  secret: 'shhuuuuut',
  resave: false,
  saveUninitialized: true,
  name: 'biscuit',
  cookie: {   maxAge: 24 * 60 * 60 * 7 * 1000}
}))

//////////////////////////////////////
// rappel pour connection a la base de donner 
require('dotenv').config(); // pouvoir utiliser le fichier env qui est un fichier caché "mdp, info connection"

//////////////////
app.use(fileUpload());

//////////////////////////////////////
//method over  utilisation de la methode
app.use(methodOverride('_method'))

//////////////////////////////////////
// Ejs  moteur de templating sert à compiler les differentes pages et à afficher les donnée de la base de donnée
app.set('view engine', 'ejs');

//////////
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  // multipleStatements: true
});

db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connecté à la base MySQL');
});

const query = util.promisify(db.query).bind(db)
global.db = db; // donne accés a la connection de l'appli a la base de donnée
global.query = query;

//////////////////
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);



/////
///affiche login 
app.get('/', function(req, res) {
	response.sendFile(path.join(__dirname + '/login.html'));
});


// catch 404 and forward to error handler
//app.use(function(req, res, next) {
 // next(createError(404));
//});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

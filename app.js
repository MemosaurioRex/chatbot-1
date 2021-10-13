const express = require('express');
require('dotenv').config()
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');

// inicializacion
const app = express();
require('./database');
require('./passport/local-auth');

// settings

const port = process.env.PORT || 3000;
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  //mensaje error login
    app.locals.signinMessagecorreo = req.flash('signinMessagecorreo');
    app.locals.signinMessagePW= req.flash('signinMessagePW');
  //mensajes de error de registro
    app.locals.signupMessagecorreo = req.flash('signupMessagecorreo');
    app.locals.signupMessagePW= req.flash('signupMessagePW');
  
    app.locals.user = req.user;
    console.log(app.locals)
    next();
  });

// Rutas Web
app.use('/', require('./router/RutasWeb'));
app.use('/cliente', require('./router/RutasWeb'));

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Título del sitio web"
    })
})


app.listen(port, () => {
    console.log('servidor a su servicio en el puerto', port)
})
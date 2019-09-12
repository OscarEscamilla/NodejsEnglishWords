const express = require('express');
const path = require('path');
const morgan = require('morgan');
const expresshbs = require('express-handlebars');

const flash = require('connect-flash');
const session = require('express-session');
const mysql_store = require('express-mysql-session');
//const mysql = require('mysql');//modulo para conectar a mysql
//const myConnection = require('express-myconnection');// genera conexion
const {database} = require('./keys.js');
//autenticacion
const passport  = require('passport');
//inicializacion

const app = express()

require('./lib/passport.js');

//configuraciones

app.set('port', process.env.PORT || 3000);
//configuracion de vistas
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expresshbs({
    defaultLayout: "main.hbs",
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: ".hbs",
    helpers : require('./lib/handlebars.js')
}));

app.set('view engine', '.hbs' );



/*database config 
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'app_links'
}, 'single'));*/
//public 

app.use(express.static(path.join(__dirname, 'public')))


//midlewares
app.use(session({
    secret: 'oscarsession',
    resave: false,
    saveUninitialized: false,
    store: new mysql_store(database)
}));
app.use(flash());
app.use(morgan('dev'));//muestra peticiones por conola
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());




//variables globales

app.use((req,res, next) => {
    app.locals.success = req.flash('success');
    next();
});


//rutas



app.use(require('./routes/index.js'));
app.use(require('./routes/autentication.js'));
app.use('/links', require('./routes/links.js'));


//public 



//starting server
app.listen(app.get('port'), ()=>{
    console.log('server on port 3000');
});
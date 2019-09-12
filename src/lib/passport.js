const passport = require('passport');
const localStrategy = require('passport-local').Strategy;


passport.use('local.signup', new localStrategy({
    usernameField: 'username', //pasamos el nombre del input por el que lo va recibir
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) =>{
    console.log(req.body);
}));



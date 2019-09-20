const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const con = require('../database.js');
const helpers = require('../lib/helpers.js');


//metodos de login con facebook

passport.use('facebook', new FacebookStrategy({
    clientID: '2113463745624148',
    clientSecret: '0cc382b0cb986d89854786750286c981',
    callbackURL: "/auth/facebook/callback",
    //profileFields: ["id", "displayName", "provider", "photos"],
  },async function(accessToken, refreshToken, profile, cb, done) {
      /*
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
    */

    console.log(profile._json);
    done();

  }
));


passport.use('local.signin', new localStrategy({
    usernameField: 'username', //pasamos el nombre del input por el que lo va recibir
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done)=>{
    //const { username , password} = req.body;
    const rows = await con.query('SELECT * FROM users WHERE username = ?', [username]);
    console.log(rows[0]);
    if(rows.length > 0){
        const user = rows[0];
        //const hash = await helpers.encryptPassword(password);
        //console.log(hash);
        const savedPassword = user.password;
        const compare = await helpers.compararPassword(password, savedPassword );
        console.log(compare);

        console.log(user.password);
        if(compare){
            done(null, user, req.flash('success', 'Welcome ' + user.fullname));
        }else{
            done(null, false, req.flash('message','Incorrect Password'));
        }
    }else{
        return done(null, false, req.flash('message','El usuario no existe'));
    }
}));


passport.use('local.signup', new localStrategy({
    usernameField: 'username', //pasamos el nombre del input por el que lo va recibir
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) =>{
    const {fullname} = req.body;
    const newUser = {
        username,
        password,
        fullname
    }

    newUser.password = await helpers.encryptPassword(password);
    const result = await con.query('INSERT INTO users SET ?', [newUser]);

    newUser.id = result.insertId;
    if (result.affectedRows == 1) {
        return  done(null, newUser);
    }
    
}));




passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const user = await con.query('SELECT * FROM users WHERE id = ?',[id]);
    return done(null, user[0]);
   
   /*
    User.findById(id, function (err, user) {
      done(err, user);
    });*/
  });
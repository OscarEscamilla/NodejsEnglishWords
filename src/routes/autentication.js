const {Router} = require('express');

const router = Router();


const passport = require('passport');

router.get('/singin',(req, res) =>{
    res.send('login');
});

router.get('/signup',(req, res) =>{
    res.render('login/signup.hbs');
});


router.post('/signup',  passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));


router.get('/logout/:name/:edad',(req, res) =>{
    console.log(req.params);
});



module.exports = router;
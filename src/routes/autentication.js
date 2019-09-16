const {Router} = require('express');

const router = Router();


const passport = require('passport');

router.get('/signin',(req, res) =>{
    res.render('login/login.hbs');
});

router.post('/signin',(req, res, next) =>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
    
});

router.get('/signup',(req, res) =>{
    res.render('login/signup.hbs');
});


router.post('/signup',  passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect:  '/signup',
    failureFlash: true
}));


router.get('/logout/{params}',(req, res) =>{
    console.log(req.params);
});


router.get('/profile',(req, res) =>{
    res.send('this is your profile');
});




module.exports = router;
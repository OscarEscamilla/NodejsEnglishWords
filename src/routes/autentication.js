const {Router} = require('express');

const router = Router();




router.get('/singin',(req, res) =>{
    res.send('login');
});


router.get('/logout',(req, res) =>{
    res.send('adios');
});



module.exports = router;
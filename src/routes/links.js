const {Router} = require('express');

const router = Router();

const controller = require('../controllers/linksController.js');

const helpers = require('../lib/helpers.js');

//precede de el prefijo /links configurado en app.js 
//         /links
router.get('/', controller.list);

//renderiza el frmulario para agregar un nuevo link
router.get('/add', helpers.isLoggedIn, controller.form_add);

router.post('/add',helpers.isLoggedIn, controller.save_link);

router.get('/delete/:id',helpers.isLoggedIn,  controller.delete_link);


router.get('/update/:id',helpers.isLoggedIn, controller.update_form);

router.post('/update/:id',helpers.isLoggedIn, controller.update);



module.exports = router;
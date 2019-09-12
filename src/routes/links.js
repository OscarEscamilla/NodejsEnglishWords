const {Router} = require('express');

const router = Router();

const controller = require('../controllers/linksController.js');


//precede de el prefijo /links configurado en app.js 
//         /links
router.get('/', controller.list);

//renderiza el frmulario para agregar un nuevo link
router.get('/add', controller.form_add);

router.post('/add', controller.save_link);

router.get('/delete/:id', controller.delete_link);


router.get('/update/:id', controller.update_form);

router.post('/update/:id', controller.update);



module.exports = router;
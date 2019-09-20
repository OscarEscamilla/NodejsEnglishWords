const con = require('../database.js');
const model = require('../models/modelLinks.js');




controller = {}



controller.list = async(req, res) =>{
    const id_user = req.user.id;
    const words = await model.get_all(id_user);
    console.log('datos obtenidos correctamente')
    res.render('links/list.hbs',{words});
    
    /*
    const result = [];
    result.push({links: links});  
    res.json(result[0]);
    */
    
}


controller.form_add = (req, res) =>{
    res.render('links/add.hbs');
}


controller.save_link = async(req, res) =>{
    const {word, pronunciation, meaning, example, synonymous  } = req.body;
    const id_user = req.user.id;
    const newWord = {
        word, 
        pronunciation, 
        meaning,
        example, 
        synonymous,
        id_user
    } 

    const result = await model.save(newWord); /*con.query('INSERT INTO links set ?', [newLink]);*/
    
    if(result.affectedRows == 1){
        req.flash('success', '!Link guardado correctamente!');

        console.log('***Insert data complet***');
        
    }
    res.redirect('/links');
}


controller.delete_link = async(req, res) =>{
    const {id} = req.params;
    const result = await model.delete(id);//con.query('DELETE FROM links WHERE id = ?',[id]);
    
    if(result.affectedRows == 1){
        req.flash('success', '!Link eliminado correctamente!');
        console.log('***delete data complet***');
    }
    res.redirect('/links');
}

controller.update_form = async(req, res ) => {
    const {id} = req.params;

    const result = await model.get_one(id);

    console.log(result[0]);

    res.render('links/edit.hbs',{ word: result[0]});
}

controller.update = async(req, res) =>{
    const {id} = req.params;
    const {word, pronunciation, meaning, example, synonymous  } = req.body
    const data = {
        word,
        pronunciation,
        meaning,
        example,
        synonymous  
    }

    const result = await model.update(data, id);

    if(result.affectedRows == 1){
        req.flash('success', '!Link actualizaco correctamente!');
        console.log('***update data complet***');
    }
    res.redirect('/links');

} 



module.exports = controller;



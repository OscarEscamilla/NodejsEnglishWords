const con = require('../database.js');
const model = require('../models/modelLinks.js');


controller = {}



controller.list = async(req, res) =>{
    const links = await model.get_all();
    console.log('datos obtenidos correctamente')
    //res.render('links/list.hbs',{links});  
    res.json(links);
}


controller.form_add = (req, res) =>{
    res.render('links/add.hbs');
}


controller.save_link = async(req, res) =>{
    const {title , url, description} = req.body;
    const newLink = {
        title,
        url,
        description
    };

    const result = await model.save(newLink); /*con.query('INSERT INTO links set ?', [newLink]);*/
    
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

    res.render('links/edit.hbs',{ link: result[0]});
}

controller.update = async(req, res) =>{
    const {id} = req.params;
    const {title, url, description} = req.body
    const data = {
        title,
        url,
        description
    };
    const result = await model.update(data, id);

    if(result.affectedRows == 1){
        req.flash('success', '!Link actualizaco correctamente!');
        console.log('***update data complet***');
    }
    res.redirect('/links');

}




module.exports = controller;
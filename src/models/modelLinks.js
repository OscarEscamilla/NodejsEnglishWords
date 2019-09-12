const con = require('../database.js');

model = {}


model.get_all = () => {
  
    return  con.query('SELECT * FROM links');
}

model.delete = (id) =>{
    const result = con.query('DELETE FROM links WHERE id = ?',[id]);
    if(result){
        return result; 
    }
}

model.save = (data) => {
    const result = con.query('INSERT INTO links set ?', [data]);
    if(result){
        return result; 
    }
}

model.get_one = (id) =>{
    const result = con.query('SELECT * FROM links WHERE id = ?', [id])
    if(result){
        return result; 
    }
}


model.update = (data, id) =>{
    const result = con.query('UPDATE links set ? WHERE id = ?', [data,id])
    if(result){
        return result; 
    }
}

module.exports = model;
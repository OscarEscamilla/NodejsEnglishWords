const con = require('../database.js');

model = {}


model.get_all = (id_user) => {
  
    return con.query('SELECT * FROM words WHERE id_user = ?',[id_user]);

  
}

model.delete = (id) =>{
    const result = con.query('DELETE FROM words WHERE id = ?',[id]);
    if(result){
        return result; 
    }
}

model.save = (data) => {
    const result = con.query('INSERT INTO words set ?', [data]);
    if(result){
        return result; 
    }
}

model.get_one = (id) =>{
    const result = con.query('SELECT * FROM words WHERE id = ?', [id])
    if(result){
        return result; 
    }
}


model.update = (data, id) =>{
    const result = con.query('UPDATE words set ? WHERE id = ?', [data,id])
    if(result){
        return result; 
    }
}

module.exports = model;
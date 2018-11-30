
const db = require('./dbconnection.js');

const Projection = {

  getAll: function (first=null, after=0){
    let query = 'SELECT * FROM `projection`'
    if(first) {
      query += ' LIMIT ?, ?'
    }
    return db.query(query, [after, first])
  },

  getById: function (id){
    let query = 'SELECT * FROM `projection` WHERE `id`=?'
    return db.query(query, [id])[0]
  },
  getByIdRoom: function (id){
    let query = 'SELECT * FROM `projection` WHERE `idRoom`=?'
    return db.query(query, [id])
  },
  getByIdFilm: function (id) {
    let query = 'SELECT * FROM `projection` WHERE `idFilm`=?'
    return db.query(query, [id])
  },
};

module.exports = Projection;


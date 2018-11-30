
const db = require('./dbconnection.js');

const Room = {

  getAll: function (first=null, after=0){
    let query = 'SELECT * FROM `room`'
    if(first) {
      query += ' LIMIT ?, ?'
    }
    return db.query(query, [after, first])
  },
  getById: function (id){
    let query = 'SELECT * FROM `room` WHERE `id` = ?'
    return db.query(query, [id])[0]
  },
  getByIdCinema: function (id){
    let query = 'SELECT * FROM `room` WHERE `idCinema` = ?'
    return db.query(query, [id])
  },
};

module.exports = Room;


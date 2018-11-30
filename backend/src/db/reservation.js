
const db = require('./dbconnection.js');

const Reservation = {

  getAll: function (first=null, after=0){
    let query = 'SELECT * FROM `reservation`'
    if(first) {
      query += ' LIMIT ?, ?'
    }
    return db.query(query, [after, first])
  },
  getById: function (id){
    let query = 'SELECT * FROM `reservation` WHERE `id`=?'
    return db.query(query, [id])[0]
  },
  getByIdClient: function (idClient){
    let query = 'SELECT * FROM `reservation` WHERE `idClient`=?'
    return db.query(query, [idClient])
  },
};

module.exports = Reservation;


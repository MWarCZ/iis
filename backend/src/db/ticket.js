
const db = require('./dbconnection.js');

const Ticket = {

  getAll: function (first=null, after=0){
    let query = 'SELECT * FROM `ticket`'
    if(first) {
      query += ' LIMIT ?, ?'
    }
    return db.query(query, [after, first])
  },
  getById: function (id){
    let query = 'SELECT * FROM `ticket` WHERE `id`=?'
    return db.query(query, [id])[0]
  },
  getByIdClient: function (idClient) {
    let query = 'SELECT * FROM `ticket` WHERE `idClient`=?'
    return db.query(query, [idClient])
  },
  getByIdReservation: function (idReservation) {
    let query = 'SELECT * FROM `ticket` WHERE `idReservation`=?'
    return db.query(query, [idReservation])
  },
  getByIdProjection: function (id) {
    let query = 'SELECT * FROM `ticket` WHERE `idProjection`=?'
    return db.query(query, [id])
  },
};

module.exports = Ticket;


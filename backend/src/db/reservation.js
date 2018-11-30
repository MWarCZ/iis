
const db = require('./dbconnection.js');
const DateTime = require('../utils/DateTime.js');

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


  create: function ({ registrated=null, idClient=null, idState=null }) {
    /*
    if (!datetime) {
      console.log('ERR')
      throw new Error('Neplatne hodnoty.')
    }
    */
    if(!registrated){
      let date = new Date()
      registrated = DateTime.date2sting(date, 'input') + ' ' + DateTime.time2string(date)
      console.log('REZERVACE_DATETIME:', registrated)
    }

    let query = "INSERT INTO `reservation` (`registrated`, `idClient`, `idState`) VALUES (?, ?, ?)"
    let { insertId } = db.query(query, [registrated, idClient, idState])
    return this.getById(insertId)
  },

  update: function ({ id, idClient, idState }) {
    if (!id && id !== 0) {
      throw new Error('Neplatne id.')
    }
    let args = []
    let query = "UPDATE `reservation` SET "
    if (idClient !== undefined) {
      query += " `idClient`=?"
      args.push(idClient)
    }
    if (idState !== undefined) {
      query += " `idState`=?"
      args.push(idState)
    }
    query += " WHERE `id`=?"
    args.push(id)

    let res = db.query(query, args)
    return this.getById(id)
  },

  remove: function ({ id }) {
    if (!id && id !== 0) {
      throw new Error('Neplatne id.')
    }
    let item = this.getById(id)
    let query = "DELETE FROM `reservation` WHERE `id`=?"
    let res = db.query(query, [id])
    return item
  },

};

module.exports = Reservation;


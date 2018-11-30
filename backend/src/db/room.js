
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


  create: function ({ name=null, capacity=null, idCinema=null }) {
    if (!name || !capacity) {
      console.log('ERR')
      throw new Error('Neplatne hodnoty.')
    }

    let query = "INSERT INTO `room` (`name`, `capacity`, `idCinema`) VALUES (?, ?, ?)"
    let { insertId } = db.query(query, [name, capacity, idCinema])
    return this.getById(insertId)
  },

  update: function ({ id, name, capacity, idCinema }) {
    if (!id && id !== 0) {
      throw new Error('Neplatne id.')
    }
    let args = []
    let query = "UPDATE `room` SET "
    if (name !== undefined) {
      query += " `name`=?"
      args.push(name)
    }
    if (capacity !== undefined) {
      query += " `capacity`=?"
      args.push(capacity)
    }
    if (idCinema !== undefined) {
      query += " `idCinema`=?"
      args.push(idCinema)
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
    let query = "DELETE FROM `room` WHERE `id`=?"
    let res = db.query(query, [id])
    return item
  },

};

module.exports = Room;


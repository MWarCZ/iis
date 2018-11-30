
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


  create: function ({ datetime=null, price=0, idRoom=null, idFilm=null }) {
    if (!datetime) {
      console.log('ERR')
      throw new Error('Neplatne hodnoty.')
    }

    let query = "INSERT INTO `projection` (`datetime`, `price`, `idRoom`, `idFilm`) VALUES (?, ?, ?, ?)"
    let { insertId } = db.query(query, [datetime, price, idRoom, idFilm])
    return this.getById(insertId)
  },

  update: function ({ id, datetime, price, idRoom, idFilm }) {
    if (!id && id !== 0) {
      throw new Error('Neplatne id.')
    }
    let args = []
    let query = "UPDATE `projection` SET "
    if (datetime !== undefined) {
      query += " `datetime`=?"
      args.push(datetime)
    }
    if (price !== undefined) {
      query += " `price`=?"
      args.push(datetime)
    }
    if (idRoom !== undefined) {
      query += " `idRoom`=?"
      args.push(idRoom)
    }
    if (idFilm !== undefined) {
      query += " `idFilm`=?"
      args.push(idFilm)
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
    let query = "DELETE FROM `projection` WHERE `id`=?"
    let res = db.query(query, [id])
    return item
  },

};

module.exports = Projection;


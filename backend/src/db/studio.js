
const db = require('./dbconnection.js');

const Studio = {

  getAll: function (first=null, after=0){
    let query = 'SELECT * FROM `studio`';
    if(first) {
      query += ' LIMIT ?, ?'
    }
    return db.query(query, [after, first])
  },
  getById: function (id){
    let query = 'SELECT * FROM `studio` WHERE `id` = ?'
    return db.query(query, [id])[0]
  },


  create: function ({ name=null }) {
    if (!name) {
      console.log('ERR')
      throw new Error('Neplatne hodnoty.')
    }

    let query = "INSERT INTO `studio` (`name`) VALUES (?)"
    let { insertId } = db.query(query, [name])
    return this.getById(insertId)
  },

  update: function ({ id, name }) {
    if (!id && id !== 0) {
      throw new Error('Neplatne id.')
    }
    let args = []
    let query = "UPDATE `studio` SET "
    if (name !== undefined) {
      query += " `name`=?"
      args.push(name)
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
    let query = "DELETE FROM `studio` WHERE `id`=?"
    let res = db.query(query, [id])
    return item
  },

};

module.exports = Studio;


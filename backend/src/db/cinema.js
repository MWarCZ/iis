
const db = require('./dbconnection.js');

const Cinema = {

  getAll: function (first=null, after=0){
    let query = 'SELECT * FROM `cinema`'
    if(first) {
      query += ' LIMIT ?, ?'
    }
    return db.query(query, [after, first])
  },

  getById: function (id){
    let query = 'SELECT * FROM `cinema` WHERE `id` = ?'
    return db.query(query, [id])[0]
  },

  create: function ({ name=null, address=null, img=null }) {
    if (!name || !address) {
      console.log('ERR')
      throw new Error('Neplatne hodnoty.')
    }

    let query = "INSERT INTO `cinema` (`name`, `address`, `img`) VALUES (?, ?, ?)"
    let { insertId } = db.query(query, [name, address, img])
    return this.getById(insertId)
  },

  update: function ({ id, name, address, img }) {
    if (!id && id !== 0) {
      throw new Error('Neplatne id.')
    }
    let args = []
    let query = "UPDATE `cinema` SET "
    if (name !== undefined) {
      query += " `name`=?"
      args.push(name)
    }
    if (address !== undefined) {
      query += " `address`=?"
      args.push(address)
    }
    if (img !== undefined) {
      query += " `img`=?"
      args.push(img)
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
    let query = "DELETE FROM `cinema` WHERE `id`=?"
    let res = db.query(query, [id])
    return item
  },

}

module.exports = Cinema;


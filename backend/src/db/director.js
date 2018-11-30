
const db = require('./dbconnection.js');

const Director = {

  getAll: function (first=null, after=0){
    let query = 'SELECT * FROM `director`'
    if(first) {
      query += ' LIMIT ?, ?'
    }
    return db.query(query, [after, first])
  },

  getById: function (id){
    let query = "SELECT * FROM `director` WHERE `id` = ?";
    let res = db.query(query, [id])
    return res[0]
  },


  create: function ({ firstname=null, lastname=null, birthday=null }) {
    if (!firstname || !lastname) {
      console.log('ERR')
      throw new Error('Neplatne hodnoty.')
    }

    let query = "INSERT INTO `director` (`firstname`, `lastname`, `birthday`) VALUES (?, ?, ?)"
    let { insertId } = db.query(query, [firstname, lastname, birthday])
    return this.getById(insertId)
  },

  update: function ({ id, firstname, lastname, birthday }) {
    if (!id && id !== 0) {
      throw new Error('Neplatne id.')
    }
    let args = []
    let query = "UPDATE `director` SET "
    if (firstname !== undefined) {
      query += " `firstname`=?"
      args.push(firstname)
    }
    if (lastname !== undefined) {
      query += " `lastname`=?"
      args.push(lastname)
    }
    if (birthday !== undefined) {
      query += " `birthday`=?"
      args.push(birthday)
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
    let query = "DELETE FROM `director` WHERE `id`=?"
    let res = db.query(query, [id])
    return item
  },

};

module.exports = Director;


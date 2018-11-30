
const db = require('./dbconnection.js');

const Actor = {

  getAll: function (first=null, after=0){
    let query = "SELECT * FROM `actor`";
    if(first) {
      query += ' LIMIT ?, ?'
    }
    return db.query(query, [after, first])
  },
  getById: function (id){
    let query = "SELECT * FROM `actor` WHERE `actor`.`id` = ?";
    let res = db.query(query, [id])
    return res[0]
  },

  getByIdFilm: function (id) {
    let query = "SELECT `actor`.* FROM `actor` JOIN `actorPlayInFilm` ON `actor`.`id` = `actorPlayInFilm`.`idActor` WHERE `actorPlayInFilm`.`idFilm` = ?"
    return db.query(query, [id])
  },


  create: function ({ firstname=null, lastname=null, birthday=null }) {
    if (!firstname || !lastname) {
      console.log('ERR')
      throw new Error('Neplatne hodnoty.')
    }

    let query = "INSERT INTO `actor` (`firstname`, `lastname`, `birthday`) VALUES (?, ?, ?)"
    let { insertId } = db.query(query, [firstname, lastname, birthday])
    return this.getById(insertId)
  },

  update: function ({ id, firstname, lastname, birthday }) {
    if (!id && id !== 0) {
      throw new Error('Neplatne id.')
    }
    let args = []
    let query = "UPDATE `actor` SET "
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
    let query = "DELETE FROM `actor` WHERE `id`=?"
    let res = db.query(query, [id])
    return item
  },

};

module.exports = Actor;


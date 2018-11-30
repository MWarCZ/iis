
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
};

module.exports = Actor;


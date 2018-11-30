
const db = require('./dbconnection.js');

const Genre = {

  getAll: function (first=null, after=0){
    let query = 'SELECT * FROM `genre`'
    if(first) {
      query += ' LIMIT ?, ?'
    }
    return db.query(query, [after, first])
  },

  getById: function (id){
    let query = ' SELECT * FROM `genre` WHERE `id` = ?'
    return db.query(query, [id])[0]
  },

  getByIdFilm: function (id){
    let query = 'SELECT `genre`.* FROM `genre` JOIN `filmIntoGenre` ON `filmIntoGenre`.`idGenre` = `genre`.`id` WHERE `filmIntoGenre`.`idFilm` = ?'
    return db.query(query, [id])
  },
};

module.exports = Genre;


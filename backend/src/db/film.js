
const db = require('./dbconnection.js');

const Film = {

  getAll: function (first=null, after=0){
    let query = 'SELECT * FROM `film`'
    if(first) {
      query += ' LIMIT ?, ?'
    }
    return db.query(query, [after, first])
  },

  getById: function (id){
    let query = 'SELECT * FROM `film` WHERE `id` = ?'
    return db.query(query, [id])[0]
  },
  getByIdDirector: function (id){
    let query = 'SELECT * FROM `film` WHERE `idDirector` = ?'
    return db.query(query, [id])
  },
  getByIdStudio: function (id){
    let query = 'SELECT * FROM `film` WHERE `idStudio` = ?'
    return db.query(query, [id])
  },

  getByIdActor: function (id){
    let query = "SELECT `film`.* FROM `film` JOIN `actorPlayInFilm` ON `actorPlayInFilm`.`idFilm` = `film`.`id` WHERE `actorPlayInFilm`.`idActor` = ?"
    return db.query(query, [id])
  },
  getByIdGenre: function (id) {
    let query = "SELECT `film`.* FROM `film` JOIN `filmIntoGenre` ON `filmIntoGenre`.`idFilm` = `film`.`id` WHERE `filmIntoGenre`.`idGenre` = ?"
    return db.query(query, [id])
  },

  create: function ({ name=null, duration=null, premiere=null, idDirector=null, idStudio=null }) {
    if (!name || !duration) {
      console.log('ERR')
      throw new Error('Neplatne hodnoty.')
    }

    let query = "INSERT INTO `film` (`name`, `duration`, `premiere`, `idDirector`, `idStudio`) VALUES (?, ?, ?, ?, ?)"
    let { insertId } = db.query(query, [name, duration, premiere, idDirector, idStudio])
    return this.getById(insertId)
  },

  update: function ({ id, name, duration, premiere, idDirector, idStudio }) {
    if (!id && id !== 0) {
      throw new Error('Neplatne id.')
    }
    let args = []
    let query = "UPDATE `film` SET "
    if (name !== undefined) {
      query += " `name`=?"
      args.push(name)
    }
    if (duration !== undefined) {
      query += " `duration`=?"
      args.push(duration)
    }
    if (premiere !== undefined) {
      query += " `premiere`=?"
      args.push(premiere)
    }
    if (idDirector !== undefined) {
      query += " `idDirector`=?"
      args.push(idDirector)
    }
    if (idStudio !== undefined) {
      query += " `idStudio`=?"
      args.push(idStudio)
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
    let query = "DELETE FROM `film` WHERE `id`=?"
    let res = db.query(query, [id])
    return item
  },

};

module.exports = Film;


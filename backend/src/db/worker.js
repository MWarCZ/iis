
const db = require('./dbconnection.js');

const Worker = {

  getAll: function (first=null, after=0){
    let query = 'SELECT * FROM `worker`'
    if(first) {
      query += ' LIMIT ?, ?'
    }
    return db.query(query, [after, first])
  },
  getById: function (id){
    let query = 'SELECT * FROM `worker` WHERE `id`=?'
    return db.query(query, [id])[0]
  },
  getByLogin: function (login){
    let query = 'SELECT * FROM `worker` WHERE `login`=?'
    return db.query(query, [login])[0]
  },
  getByLoginAndPassord: function (login, password){
    let query = 'SELECT * FROM `worker` WHERE `login`=? AND `password`=?'
    return db.query(query, [login, password])[0]
  },
};

module.exports = Worker;


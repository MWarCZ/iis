
const db = require('./dbconnection.js');

const State = {

  getAll: function (first=null, after=0){
    let query = 'SELECT * FROM `state`'
    if(first) {
      query += ' LIMIT ?, ?'
    }
    return db.query(query, [after, first])
  },
  getById: function (id) {
    let query = 'SELECT * FROM `state` WHERE `id`=?'
    return db.query(query, [id])[0]
  },
};

module.exports = State;



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
};

module.exports = Studio;


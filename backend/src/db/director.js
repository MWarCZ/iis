
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
};

module.exports = Director;


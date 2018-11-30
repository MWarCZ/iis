
const db = require('./dbconnection.js');

const Job = {

  getAll: function (first=null, after=0){
    let query = 'SELECT * FROM `job`'
    if(first) {
      query += ' LIMIT ?, ?'
    }
    return db.query(query, [after, first])
  },

  getById: function (id){
    let query = ' SELECT * FROM `job` WHERE `id` = ?'
    return db.query(query, [id])[0]
  },

  getByIdWorker: function (id){
    let query = 'SELECT `job`.* FROM `job` JOIN `worker` ON `worker`.`idJob` = `job`.`id` WHERE `worker`.`id` = ?'
    return db.query(query, [id])[0]
  },
};

module.exports = Job;


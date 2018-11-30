
const mysql = require('sync-mysql');

  const db = new mysql ({
    host: 'localhost',
    user: 'dev',
    password: 'HovnoKleslo',
    database: 'xxx',
  });

module.exports = db;

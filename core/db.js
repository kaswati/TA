'use strict';

module.exports = fw => {
    let db = require('harmony-db');

    fw.db = db.connect({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        log: ENV !== 'production' ? console.log : false
    });
}
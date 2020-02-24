const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'recomendations'
});

mysqlConnection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Db is conected');
    }
});

module.exports = mysqlConnection;
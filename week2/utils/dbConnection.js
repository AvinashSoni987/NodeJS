const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lion#123',
    database: 'Form'
});
dbConnection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('connected');
    }
});

module.exports = dbConnection.promise();
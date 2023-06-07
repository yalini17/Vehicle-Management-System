const mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
  user: 'root',
  password: '',
  database: 'testing5',
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;
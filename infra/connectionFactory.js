var mysql = require("mysql");

function connectionFactory(){
	return  connection = mysql.createConnection({
			host : process.env.DB_HOST,
			user : process.env.DB_USER,
			password : process.env.DB_PASS,
			database : process.env.DB_NAME,
			multipleStatements: true
		});
}

module.exports = function(){
	return connectionFactory;
}
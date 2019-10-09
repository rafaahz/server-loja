function TransportadorasDAO(connection){
	this.connection = connection;
};

TransportadorasDAO.prototype.listaTransporte = function(callback){
	this.connection.query("SELECT * FROM transportadoras", callback);
};

TransportadorasDAO.prototype.listaCidade = function(callback){
	this.connection.query("SELECT * FROM cidades", callback);
};

TransportadorasDAO.prototype.addCidade = function(cidade, callback){
	this.connection.query("INSERT INTO cidades SET ?", cidade ,callback);
};

TransportadorasDAO.prototype.listaTudo = function(callback){
	this.connection.query("SELECT * from cidades;SELECT * from transportadoras;", async function(err, res){
		if(err) console.log(err);
		await callback(res)
	})
}

module.exports = function(){
	return TransportadorasDAO;
}
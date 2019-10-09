
module.exports = function(app){
	
	app.get('/juncao-cobranca', function(req, res, next) {
	  res.render('juncao-cobranca');
	})
	
	app.post('/juncao-cobranca', function(req, res){

		let info = req.body;
		let sendMail = app.infra.emailConfig;
		sendMail(info.remetente, info.tabela, info.titulo, res);	
	})
};
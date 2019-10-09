
let obj = {
	nome: "teste abc",
	sub: "123456",
	otr: "teste teste",
	fnc: function(a){
		console.log(a);
	}
};


module.exports = function(app){
	app.get('/tabela-materiais', function(req, res, next) {
	  res.render('tabela-materiais', {obj: obj} );
	})

	app.post('/htmlemail', function(req, res){
		let info = req.body;
		let sendMail = app.infra.emailConfig;
		sendMail(info.remetente, info.tabela, info.titulo, res);	
	})
};
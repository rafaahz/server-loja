
module.exports = function(app){

app.delete("/transportadoras", async function(req, res){
		var id = req.body.id;
		var str = "";

		if(req.body.atualiza){
			let obj = req.body.atualiza;
			for(let i=0; i<obj.length; i++){
				str += "UPDATE cidades SET array = \""+obj[i].array+"\" WHERE cidade = \""+obj[i].cidade+"\";";
			}
		}
		var connection = app.infra.connectionFactory();
		await connection.query(`${str} DELETE FROM transportadoras WHERE id = ${id}`, function(err, result){
			if (err) console.log(err);
		})
		await connection.query(`SELECT * FROM cidades; SELECT * FROM transportadoras`, async function(err, result){
			if (err){ console.log(err); return;}
			var dados = await result;
			res.status(200).send(dados);
		})
		connection.end();
	})

};

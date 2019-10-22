
module.exports = function(app){	
	
	app.get("/cidades", function(req, res){
		let connection = app.infra.connectionFactory();
		let conexao = new app.infra.TransportadorasDAO( connection );
		conexao.listaTudo( (lista)=>{
			res.status(200).json(lista);
		} )
		connection.end();
	})

	app.post("/item", async function(req, res){
		let body = req.body;

		if(body.local === "transportadoras"){
			var c1 = "nome";
			var c2 = "telefone";
		} else if(body.local === "cidades"){
			var c1 = "cidade";
			var c2 = "estado";
		}

		var connection = app.infra.connectionFactory();
		await connection.query(`INSERT INTO ${body.local} (${c1}, ${c2}) VALUES ('${body.titulo}','${body.subInfo}');`);
		let conexao = new app.infra.TransportadorasDAO( connection );
		conexao.listaTudo( (lista)=>{
			res.status(200).json(lista);
		} )
		connection.end();
	})
	
	app.put("/cidades", async function(req, res){
		
		// dados vindo [array alterada, "id" do item a ser alterado];
		let updates = [];
		var connection = app.infra.connectionFactory();
		if(req.body.Transportadora){
			updates.length = 0;
			for(let i =0; i<req.body.lista.length; i++){
				updates.push(`UPDATE cidades SET array = "${req.body.lista[i][0]}" WHERE id = "${req.body.lista[i][1]}";`)
			}

			await connection.query( updates.join(""), function(err, result){
				if (err){ console.log(err); return;}
			})
		} else {
			await connection.query(`UPDATE cidades SET array = ? WHERE id = ?`, req.body.lista, function(err, result){
				if (err){ console.log(err); return;}
			})
		}

		let conexao = new app.infra.TransportadorasDAO( connection );
		conexao.listaTudo( (lista)=>{
			res.status(200).json(lista);
		} )

		connection.end();
		
	})

	app.put("/item/atualiza", async function(req, res){
		let body = req.body;
		if(body.local === "TRANSPORTADORAS"){
			var c1 = "nome";
			var c2 = "telefone";
			var table = "transportadoras";
		} else if(body.local === "CIDADES"){
			var c1 = "cidade";
			var c2 = "estado";
			var table = "cidades";
		}
		var connection = app.infra.connectionFactory();
		await connection.query(`UPDATE ${table} SET ${c1} = "${body.titulo}", ${c2} = "${body.subInfo}" WHERE id = ${body.id}`);

		let conexao = new app.infra.TransportadorasDAO( connection );
		conexao.listaTudo( (lista)=>{
			res.status(200).json(lista);
		} )
		connection.end();
	})



	app.delete("/cidades", async function(req, res){
		var id = req.body.id;

		var connection = app.infra.connectionFactory();
		await connection.query(`DELETE FROM cidades WHERE id = ${id}`, function(err, result){
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
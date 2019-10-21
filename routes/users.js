

module.exports = function(app){

    app.get('/users', (req, res)=>{
        var connection = app.infra.connectionFactory();
        connection.query(`SELECT nome,email FROM usuarios`, (err, result)=>{
            if(err) res.status(500).json({erro: "erro no servidor"})

            res.status(200).json( result )
        });
    } )
    
};
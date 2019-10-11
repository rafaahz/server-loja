const jwt = require("jsonwebtoken");

module.exports = function(app){
    
let api = {};

api.autentica = async function(req, res){

    let connection = app.infra.connectionFactory();
    let a = req.body;

    await connection.query(`SELECT * FROM usuarios;`, async function(err, results){
        if(err) throw new Error(err);

        var user = results.filter( (item)=>{
            return a.email === item.email && a.senha === item.senha;
        })

        if(user.length > 0){
            let token = jwt.sign(
                    {id: user[0].idUsuario},
                    process.env.JWT_TOKEN, 
                    { expiresIn: 36000 } 
                );
                //86400

            res.set("x-access-token", token);
            let usuario = [].concat(user).map(({ senha, ...demais }) => demais);
            res.status(200).json( {token, usuario} );

        } else {
            res.set("x-access-token", 'invalid');
            res.status(401).json( {"ERRO": "ACECSSO NEGADO"} );
        } 

    });

}


api.verificaToken = function(req, res, next){
    let token = req.headers['x-access-token']; 

    jwt.verify(token, process.env.JWT_TOKEN, function(err, decoded){
        if(err){ 
            res.status(401).send('FAÇA LOGIN PARA ACESSAR INFORMAÇÕES DO SERVIDOR');
        } else {
            next();
        }

    })

}

api.valido = function(req, res, next){

    let token = req.headers['x-access-token']; 

    jwt.verify(token, process.env.JWT_TOKEN, function(err, decoded){
        if(err){ 
            res.status(401).send('FAÇA LOGIN PARA ACESSAR INFORMAÇÕES DO SERVIDOR');
        } else {

            var id = decoded.id;

            let connection = app.infra.connectionFactory();
            connection.query(`SELECT * from usuarios WHERE idUsuario='${id}';`, function(err, resp){
                if(err) return console.log(err);

                let usuario = [].concat(resp).map(({ senha, ...demais }) => demais);

                res.status(200).json({token: true, usuario: usuario });

            })

        }

    })

}


    return api;
}


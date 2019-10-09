
module.exports = function(app){

    let api = app.api.auth;
    
    app.post("/login", api.autentica );
    app.get("/verificaToken", api.valido)
    app.use("/*", api.verificaToken );


    
};
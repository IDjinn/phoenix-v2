const { connect } = require('mongoose');
module.exports = class Database {
    constructor(client, login){
        this.usuarios = [];
        this.client = client;
        this.login(login)
    }
    login(login){
        connect(login,{useNewUrlParser:true}).then(() => this.init())
        .catch(e => console.error(e));
    }
    init(){
        console.log(`[DATABASE] >> Conectado com sucesso!`);
    }
}
const UsersDB = require('../database/user.js');
const { Collection } = require('discord.js');
const TempoOnline = require('./online.js');

module.exports = class UsersManager {
    constructor(client){
        this.client = client;
        this.users = new Collection();
        this.init();
    }
    async init(){
        await UsersDB.find({}, (erro, rows) => {
            if(erro) return console.error(erro);
            else if (rows != null) {
                rows.forEach(row => {
                    this.users[row.id] = new User(row);
                });
            }
        })
        this.load();
    }
    async load(){
        await this.client.users.forEach(user =>{
            if(!this.users[user.id]){
                const userDB = new UsersDB({
                    id: user.id,
                    nivel: 0,
                    xp: 0,
                    moedas: 0,
                    reputacao: 0,
                    tempoOnline: 0
                })
                this.users[user.id] = new User(userDB);
                userDB.save();
            }
        })
        this.client.getUser = (id) => this.users[id];
        new TempoOnline(this.client, this.users);
    }
}

class User {
    constructor(row){
        this.id = row.id,
        this.nivel = row.nivel,
        this.xp = row.xp,
        this.moedas = row.moedas,
        this.reputacao = row.reputacao
        this.tempoOnline = row.tempoOnline

        this.ping = 0;
        this.status = '';
        this.started = Date.now();
    }
    salvarTempoOnline(){
        const tempo = Date.now() - this.started;
        this.tempoOnline += tempo;
        this.ping = 0;
        this.started = Date.now();
        UsersDB.findOneAndUpdate({id: this.id}, {$inc: {tempoOnline: tempo}},(erro,sucesso) => {
            if(erro) console.error(erro);
        });
    }
    onlinePing(){ this.ping += 1; }
}
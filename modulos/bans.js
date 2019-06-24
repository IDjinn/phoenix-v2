const BansDB = require('../database/banidos.js');
const { Collection } = require('discord.js');
module.exports = class BansManager{
    constructor(servidores){
        this.servidores = servidores;
        this.bans = new Collection();
        this.init();
    }
    async init(){
        await BansDB.find({}, (erro, rows) => {
            if(erro) return console.error(erro);
            else if(rows) rows.forEach(row => {
                this.bans[row.id] = new Banido(row);
            });
        });

        this.ready();
    }
    ready(){
        console.log(`[BANS] - ${this.bans.size} usuários banidos!`);
    }
}

class Banido {
    constructor(ban){
        this.id = ban.id;
        this.tipo = ban.tipo;
        this.motivo = ban.motivo;
        this.banidoPor = ban.banidoPor;
        this.tempo = ban.tempo;
    }
    expirado(){
        if(this.tempo.expiravel)
            return Date.now() - this.tempo.expiraEm > 0;
        return false;
    }
}
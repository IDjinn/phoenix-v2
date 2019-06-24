const Servidores = require('../database/servidor.js')
const { Collection } = require('discord.js');
const AutoModeracao = require('../modulos/automod.js');
const Permissoes = require('../modulos/permissions.js');
const Contador = require('../modulos/contador.js');
const Welcome = require('../modulos/welcome.js');
const Logger = require('../modulos/logger.js');
module.exports = class ServidoresManager {
    constructor(client){
        this.client = client;
        this.servidores = new Collection();
        this.init();
    }
    async init(){
        await Servidores.find({},async (erro,guilds) => {
            if(erro) return console.error(erro);
            else if(guilds != null){
                guilds.forEach(async guild => {
                    this.servidores[guild.id] = new Servidor(await this.client.guilds.get(guild.id), guild);
                });
            }
        });
        this.load();
    }
    async load(){
        await this.client.guilds.forEach(guild => {
            if(!this.servidores[guild.id]){
                let servidor = new Servidores({id: guild.id});
                this.servidores[servidor.id] = new Servidor(guild,servidor);
                servidor.save();
            }
        });
        
        this.ready();
    }
    ready(){
        console.log(`[SERVIDORES] >> ${this.servidores.size} Servidores Prontos!`);
        this.client.getServidor = (guild) => this.servidores[guild];
    }
}

class Servidor {
    constructor(guild, servidor){
        this.guild = guild;
        this.id = servidor.id;
        this.prefixo = servidor.prefixo;
        this.vip = servidor.vip;
        this.permissoes = new Permissoes(servidor.cargos);
        this.moderacao = new AutoModeracao(servidor.moderacao, this.permissoes);
        this.contador = new Contador(this.guild, servidor.contador);
        this.welcome = new Welcome(this.guild, servidor.welcome);
        this.logger = new Logger(this.guild, servidor.logger);
    }
    setPrefix(prefixo){
        if(prefixo.length > 1 && prefixo.length < 5){
            this.prefixo = prefixo;
            Servidores.findOneAndUpdate({id: this.id}, {prefixo: prefixo});
        }
    }
    isVip(){
        return this.vip;
    }
}
const { Collection } = require('discord.js')
const TempRoleDB = require('../database/temprole.js')

module.exports = class TempRoleManager {
    constructor(client){
        this.client = client;
        this.roles = new Collection();
        this.client.addTempRole = (role) => this.roles[role._id] = new TempRole(role);
        this.init();
    }
    init(){
        TempRoleDB.find({},(erro,TempRoles) => {
            if(erro) return console.error(erro);
            else if(TempRoles) TempRoles.forEach(role =>{
                this.roles[role._id] = new TempRole(role);
            })
        })
        setInterval(() => this.ready(), 1000);
    }
    ready(){
        for(let i in this.roles){
            let role = this.roles[i];
            if(role.expirado()) {
                let guild = this.client.guilds.get(role.servidor);
                let usuario = guild.members.get(role.usuario);
                usuario.removeRole(guild.roles.get(role.id)).catch();
                delete this.roles[role._id];
                TempRoleDB.findOneAndDelete(role.id);
                continue;
            }
            let guild = this.client.guilds.get(role.servidor);
            let usuario = guild.members.get(role.usuario);
            
            if(!usuario.roles.has(role.id)){
                delete this.roles[role._id];
                TempRoleDB.findOneAndDelete(role.id);
            }
        };
    }
}

class TempRole {
    constructor(role){
        this._id = role._id;
        this.servidor = role.servidor;
        this.id = role.id;
        this.usuario = role.usuario;
        this.criadoEm = role.criadoEm;
        this.expiraEm = role.expiraEm;
    }
    expirado(){
        return this.expiraEm < Date.now();
    }
}
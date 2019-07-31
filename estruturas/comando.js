const { donos } = require('../config.js');
module.exports = class Comando {
    constructor(client, options = {}){
        this.client = client;
        this.nome = options.nome || "Inválido";
        this.descricao = options.descricao || "Sem descrição";
        this.aliases = options.aliases || [];
        this.permissaoBot = options.clientPermissoes || [];
        this.permissoes = options.permissoes || [];
        this.apenasCriador = options.apenasCriador || false;
        this.enabled = options.enabled || true;
    }
    ativo(id){
        if(!donos.includes(id) && this.apenasCriador || !this.enabled) return false;
        return true;
    }
    userHasPermission(message){
        if(!message) return false;
        else if(this.permissoes.length == 0) return true;
        else if(message.member.hasPermission("ADMINISTRATOR")) return true;
        this.permissoes.forEach(async permissao => {
            if(permissao == 'MOD') 
                return await this.client.getServidor(message.id).permissoes.isMod(message.member);
            else if(permissao == 'ADM') 
                return await this.client.getServidor(message.id).permissoes.isAdm(message.member);
            else if(message.member.hasPermission(permissao)) 
                return true;
        });
        return false;
    }
    botHasPermission(message){
        if(!message) return false;
        else if(this.permissaoBot.length == 0) return true;
        else if(message.member.hasPermission("ADMINISTRATOR")) return true;
        this.permissaoBot.forEach(permissao => {
            if(!message.guild.me.hasPermission(permissao)) return permissao;
        });
        return false;
    }
    getMember(position){
        
    }
}
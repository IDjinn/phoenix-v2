module.exports = class Contador {
    constructor(guild, contador){
        this.guild = guild;
        this.contador = contador;
        this.atualizar();
    }
    atualizar(){
        if(this.contador.usuarios.enabled){
            if(this.contador.usuarios.canal){
                const canal = this.guild.channels.get(this.contador.usuarios.canal);
                if(canal){
                    if(canal.manageable){
                        canal.setName(this.contador.usuarios.nome.replace(/{usuarios}/gi, this.guild.members.filter(member => !member.user.bot).size));
                    }
                }
            }
        }
        if(this.contador.bots.enabled){
            if(this.contador.bots.canal){
                const canal = this.guild.channels.get(this.contador.bots.canal);
                if(canal){
                    if(canal.manageable){
                        canal.setName(this.contador.bots.nome.replace(/{bots}/gi, this.guild.members.filter(member => member.user.bot).size));
                    }
                }
            }
        }
        if(this.contador.canais.enabled){
            if(this.contador.canais.canal){
                const canal = this.guild.channels.get(this.contador.canais.canal);
                if(canal){
                    if(canal.manageable){
                        canal.setName(this.contador.canais.nome.replace(/{canais}/gi, this.guild.channels.size));
                    }
                }
            }
        }
    }
}
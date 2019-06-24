const { NaoPodeEnviarConvites, NaoPodeEnviarLinks } = require('../embeds.js');
module.exports = class AutoModeracao {
    constructor(moderacao, permissoes){
        this.permissoes = permissoes;
        this.automod = moderacao;
    }
    filtrarMensagem(message){
        if(!this.permissoes.canSendInvite(message.member))
            this.convites(message);
        if(!this.permissoes.canSendLink(message.member))
            this.links(message);
    }
    convites(message){
        if(this.automod.convites.enabled){
            if(message.content.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi)){
                message.delete().catch();
                message.channel.send(new NaoPodeEnviarConvites(message.author.id));
            }
        }
    }
    links(message){
        if(this.automod.links.enabled){
            if(this.automod.links.whitelist.includes(message.channel.id)){
                if(message.content.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)){
                    message.delete().catch();
                    message.channel.send(new NaoPodeEnviarLinks(message.author.id));
                    return true;
                }
            }
        }
        return false;
    }
}
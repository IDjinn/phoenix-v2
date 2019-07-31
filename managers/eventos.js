module.exports = class EventosManager {
    constructor(client){
        this.client = client;
        this.init();
    }
    init(){
        this.client.on('message', message => {
            if(message.channel.type != 'text' || message.type != 'DEFAULT' || message.author.bot) return;
            const client = message.client;
            const servidor = this.client.getServidor(message.guild.id);
            
            client.comando(message);
            servidor.moderacao.filtrarMensagem(message);
        });
        this.client.on('memberUpdate', member => {
            this.client.getServidor(member.guild.id).logger.memberUpdated(member);
        });
        this.client.on('guildUpdate', guild => {
            this.client.getServidor(guild.id).logger.guildUpdated(guild);
        });
        this.client.on('roleCreate', role => {
            this.client.getServidor(role.guild.id).logger.roleCreated(role);
        });
        this.client.on('roleDelete', role => {
            this.client.getServidor(role.guild.id).logger.roleDeleted(role);
        });
        this.client.on('roleUpdate', (antiga, nova) => {
            this.client.getServidor(antiga.guild.id).logger.roleUpdated(antiga, nova);
        });
        this.client.on('channelDelete', channel => {
            const servidor = this.client.getServidor(member.guild.id);
            servidor.contador.atualizar();
            servidor.logger.channelDeleted(channel);
        });
        this.client.on('channelUpdate', (antigo, novo) => {
            this.client.getServidor(antigo.guild.id).logger.channelUpdated(antigo, novo);
        });
        this.client.on('channelCreate', channel => {
            const servidor = this.client.getServidor(channel.guild.id);
            servidor.contador.atualizar();
            servidor.logger.chanelCreated(channel);
        });
        this.client.on('messageDelete', message => {
            const servidor = this.client.getServidor(message.guild.id);
            servidor.logger.messageDeleted(message);
        });
        this.client.on('messageUpdate', (antiga, nova) => {
            if(!antiga.content || !nova.content) return;
            this.client.getServidor(antiga.guild.id).logger.messageUpdated(antiga, nova);
        });
        this.client.on('raw', raw => {
            if (raw.t === 'MESSAGE_REACTION_ADD' || raw.t == "MESSAGE_REACTION_REMOVE")
                this.client.reactionRoleManager.onReaction(raw, this.client);
        });
        this.client.on('guildMemberAdd', member => {
            const servidor = this.client.getServidor(member.guild.id);
            servidor.contador.atualizar();
            servidor.moderacao.mencionavel(member);
            servidor.moderacao.antiZalgo(member);
            servidor.welcome.onMemberJoin(member);
        });
        this.client.on('guildMemberRemove', member => {
            let servidor = this.client.getServidor(member.guild.id);

            servidor.contador.atualizar();
            servidor.welcome.onMemberLeave(member);
        });
        this.ready();
    }
    ready(){
        console.log(`[EVENTOS] Prontos!`);
    }
} 
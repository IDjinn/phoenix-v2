const { Collection } = require('discord.js')
const ReactionRoleDB = require('../database/reactionrole.js')

module.exports = class ReactionRoleManager {
    constructor(client){
        this.client = client;
        this.roles = new Collection();
        this.client.addReactionRole = (role) => this.roles[role.mensagem] = new ReactionRole(role);
        this.init();
    }
    init(){
        ReactionRoleDB.find({},(erro,ReactionRoles) => {
            if(erro) return console.error(erro);
            else if(ReactionRoles) ReactionRoles.forEach(role =>{
                this.roles[role.mensagem] = new ReactionRole(role);
            });
        });
    }
    async onReaction(reaction, client){
        let tipo = reaction.t == 'MESSAGE_REACTION_ADD' ? true : false;
        reaction = reaction.d;
        let ReactionRole = this.roles[reaction.message_id];
        let emoji = reaction.emoji.id ? reaction.emoji.id : reaction.emoji.name;
        if(ReactionRole.emoji == emoji && ReactionRole.canal == reaction.channel_id && ReactionRole.servidor == reaction.guild_id){
            let guild = await client.guilds.get(reaction.guild_id);
            let membro = await guild.members.get(reaction.user_id);
            if(!ReactionRole.role || !membro) return;
            if(tipo) membro.addRole(ReactionRole.role).catch();
            else membro.removeRole(ReactionRole.role).catch();
        }
    }
}

class ReactionRole {
    constructor(role){
        this.role = role.role;
        this.mensagem = role.mensagem;
        this.servidor = role.servidor;
        this.canal = role.canal;
        this.emoji = role.emoji;
    }
}
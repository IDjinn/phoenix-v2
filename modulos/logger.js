const { guilds, channels, roles, members } = require('../utilitarios/audit.js');
const { RichEmbed } = require('discord.js');
module.exports = class Logger {
    constructor(guild, logger){
        this.guild = guild;
        this.logger = logger;
    }
    async getAuditLog(object, type){
        if(object.guild)
            return await object.guild.fetchAuditLogs({type: type}).then(audit => audit.entries.first());
        else 
            return await object.fetchAuditLogs({type: type}).then(audit => audit.entries.first());
    }
    async roleCreated(role){
        if(this.logger.roleCreated.enabled){
            if(!role.guild.me.hasPermission('VIEW_AUDIT_LOG'))
                this.guild.channels.get(this.logger.roleCreated.channel).send(new roleCreated(antiga, novo));
            else {
                let log = await this.getAuditLog(role, 'ROLE_CREATE');
                this.guild.channels.get(this.logger.roleCreated.channel).send(await roles(role, log));
            }
        }
    }
    async roleDeleted(role){
        if(this.logger.roleDeleted.enabled){
            if(!role.guild.me.hasPermission('VIEW_AUDIT_LOG'))
                this.guild.channels.get(this.logger.roleDeleted.channel).send(new roleDeleted(antiga, novo));
            else {
                let log = await this.getAuditLog(role, 'ROLE_DELETE');
                this.guild.channels.get(this.logger.roleDeleted.channel).send(await roles(role, log));
            }
        }
    }
    async roleUpdated(antiga, novo){
        if(this.logger.roleUpdated.enabled){
            if(!antiga.guild.me.hasPermission('VIEW_AUDIT_LOG'))
                this.guild.channels.get(this.logger.roleUpdated.channel).send(new roleUpdated(antiga, novo));
            else {
                let log = await this.getAuditLog(antiga, 'ROLE_UPDATE');
                this.guild.channels.get(this.logger.roleUpdated.channel).send(await roles(antiga, log));
            }
        }
    }
    async memberUpdated(antigo, novo){
        if(this.logger.memberUpdated.enabled){
            if(!antigo.guild.me.hasPermission('VIEW_AUDIT_LOG'))
                this.guild.channels.get(this.logger.memberUpdated.channel).send(new memberUpdated(antigo, novo));
            else {
                let log = await this.getAuditLog(antigo, 'MEMBER_UPDATE');
                this.guild.channels.get(this.logger.memberUpdated.channel).send(await members(antigo, log));
            }
        }
    }
    async guildUpdated(antiga, nova){
        if(this.logger.guildUpdated.enabled){
            if(!antiga.me.hasPermission('VIEW_AUDIT_LOG'))
                this.guild.channels.get(this.logger.guildUpdated.channel).send(new guildUpdated(antiga, nova));
            else {
                let log = await this.getAuditLog(antiga, 'GUILD_UPDATE');
                this.guild.channels.get(this.logger.guildUpdated.channel).send(await guilds(antiga, log));
            }
        }
    }
    messageDeleted(message){
        if(this.logger.messageDeleted.enabled)
            this.guild.channels.get(this.logger.messageDeleted.channel).send(new messageDeleted(message));
    }
    messageUpdated(antiga, nova){
        if(this.logger.messageUpdated.enabled && antiga.content != nova.content)
            this.guild.channels.get(this.logger.messageUpdated.channel).send(new messageUpdated(antiga, nova));
    }
    async channelCreated(channel){
        if(this.logger.channelCreated.enabled){
            if(!channel.guild.me.hasPermission('VIEW_AUDIT_LOG'))
                this.guild.channels.get(this.logger.channelCreated.channel).send(new channelCreated(channel));
            else {
                let log = await this.getAuditLog(channel, 'CHANNEL_CREATE');
                this.guild.channels.get(this.logger.channelCreated.channel).send(await channels(channel, log));
            }
        }
    }
    async channelDeleted(channel){
        if(this.logger.channelDeleted.enabled){
            if(!channel.guild.me.hasPermission('VIEW_AUDIT_LOG'))
                this.guild.channels.get(this.logger.channelDeleted.channel).send(new channelDeleted(channel));
            else {
                let log = await this.getAuditLog(channel, 'CHANNEL_DELETE');
                this.guild.channels.get(this.logger.channelDeleted.channel).send(await channels(channel, log));
            }
        }
    }
    async channelUpdated(channel){
        if(this.logger.channelUpdated.enabled){
            if(!channel.guild.me.hasPermission('VIEW_AUDIT_LOG'))
                this.guild.channels.get(this.logger.channelUpdated.channel).send(new channelUpdated(channel));
            else {
                let log = await this.getAuditLog(channel, 'CHANEL_UPDATE');
                this.guild.channels.get(this.logger.channelUpdated.channel).send(await channels(channel, log));
            }
        }
    }
}

class roleDeleted extends RichEmbed {
    constructor(role){
        super();
        this.setTitle(`Cargo deletado`);
        this.setDescription(`${role.name} acaba de ser deletado.`);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}
class roleCreated extends RichEmbed {
    constructor(role){
        super();
        this.setTitle(`Cargo criado`);
        this.setDescription(`${role.name} acaba de ser criado.`);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}
class memberUpdated extends RichEmbed {
    constructor(channel){
        super();
        this.setTitle(`Canal deletado`);
        this.setDescription(`${channel.name} acaba de ser deletado.`);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}
class guildUpdated extends RichEmbed {
    constructor(guild){
        super();
        this.setTitle(`Servidor atualizado`);
        this.setDescription(`${guild.name} acaba de ser atualizado.`);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}
class channelDeleted extends RichEmbed {
    constructor(channel){
        super();
        this.setTitle(`Canal deletado`);
        this.setDescription(`${channel.name} acaba de ser deletado.`);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}
class channelUpdated extends RichEmbed {
    constructor(channel){
        super();
        this.setTitle(`Canal atualizado`);
        this.setDescription(`${channel.name} acaba de ser atualizado.`);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}
class channelCreated extends RichEmbed {
    constructor(channel){
        super();
        this.setTitle(`Canal criado`);
        this.setDescription(`${channel.name} acaba de ser criado.`);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}
class messageDeleted extends RichEmbed {
    constructor(message){
        super();
        this.setTitle(`Mensagem Deletada`);
        this.setDescription(`${message.content}`);
        this.setAuthor(message.author.tag);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}
class messageUpdated extends RichEmbed {
    constructor(antiga, nova){
        super();
        this.setTitle(`Mensagem Atualiza`);
        this.setDescription(`Antiga: ${antiga.content}\n\nNova: ${nova.content}`);
        this.setAuthor(nova.author.tag);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}
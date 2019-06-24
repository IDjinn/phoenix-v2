const { WelcomeEmbed, LeaveEmbed } = require('../embeds.js');
module.exports = class Welcome {
    constructor(guild, welcome){
        this.guild = guild;
        this.welcome = welcome;
    }
    onMemberJoin(member){
        if(this.welcome.join.enabled && !member.user.bot){
            let channel = this.guild.channels.get(this.welcome.join.channel);
            if(channel) return channel.send(new WelcomeEmbed(member.id, member.guild.name));
        }
    }
    onMemberLeave(member){
        if(this.welcome.leave.enabled && !member.user.bot){
            let channel = this.guild.channels.get(this.welcome.leave.channel);
            if(channel) return channel.send(new LeaveEmbed(member.id));
        }
    }
}
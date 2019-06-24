module.exports = class AutoRole{
    constructor(guild, autorole){
        this.guild = guild;
        this.autorole = autorole;
    }
    giveRoles(member){
        if(this.autorole.enabled)
            for(let i of this.autorole.roles){
                let role = this.guild.roles.get(i);
                if(role)
                    if(role.manageable)
                        member.addRole(role);
            }
    }
}
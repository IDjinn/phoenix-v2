module.exports = class PermissionsManager{
    constructor(cargos){
        this.cargos = cargos;
    }
    isMod(member){
        for(let cargo in this.cargos.moderador)
            if(member.roles.has(cargo))
                return true;
        return false;
    }
    isAdm(member){
        for(let cargo in this.cargos.administrador)
            if(member.roles.has(cargo))
                return true;
        return false;
    }
    canSendInvite(member){
        for(let cargo in this.cargos.convites)
            if(member.roles.has(cargo))
                return true;
        return false;
    }
    canSendLink(member){
        for(let cargo in this.cargos.links)
            if(member.roles.has(cargo))
                return true;
        return false;
    }
}
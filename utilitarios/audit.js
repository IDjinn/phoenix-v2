const { RichEmbed } = require('discord.js');
module.exports.channels = (channel, log) => {
if(log.action == 'CHANNEL_CREATE'){
    if (channel.type === 'text') {
        title = "Texto";           
    }           
    else if (channel.type === 'voice') {             
        title = "Voz";           
    }
    else title = "Categoria";
    
    return new RichEmbed()
    .setTitle(`Canal de ${title} Criado`)
    .setColor('#ffffff')   
    .setDescription(`Nome: ${channel.name}\nCriado por: <@${log.executor.id}>\nMenção: <#${channel.id}>`)    
    .setTimestamp()
}

else if(log.action == 'CHANNEL_DELETE'){
    if (channel.type === 'text') {             
        title = "Texto";           
    }           
    else if (channel.type === 'voice') {             
        title = "Voz";           
    }
    return new RichEmbed()               
    .setTitle(`Canal de ${title} Deletado`)                  
    .setColor('#ffffff')               
    .setDescription(`Nome: ${channel.name}\nDeletado por: <@${log.executor.id}>`)               
    .setTimestamp()
}
else if(log.action == 'CHANNEL_UPDATE'){           
    if (channel.type === 'text') {             
        title = "Texto";           
    }           
    else if (channel.type === 'voice') {
        title = "Voz";
    }
    let alterado = ""
    for(let c in log.changes){               
        let antigo = "" + log.changes[c].old;               
        let novo = "" + log.changes[c].new;               
        let tipo = "" + log.changes[c].key;               
        tipo = tipo.replace('name','Nome').replace('position','Posição')               
        .replace('topic','Tópico').replace('nsfw','NSFW?').replace('rate_limit_per_user','SlowMode')               
        .replace('bitrate','BitRate').replace('userLimit','Limite de Usuários');               
        antigo = antigo.replace('true','Sim').replace('false','Não').replace('undefined','Não Definido!');               
        novo = novo.replace('true','Sim').replace('false','Não');                
        alterado = alterado + tipo + ": Antes: " + antigo + " -  Agora: " + novo + "\n";           
    }
    return new RichEmbed()
    .setTitle(`Canal de ${title} Atualizado`)
    .setColor('#ffffff')
    .setDescription(`Nome: ${channel.name}\nAtualizado por: <@${log.executor.id}>\nMenção: <#${channel.id}>\n\nAlterações: \`${alterado}\``)
    .setTimestamp();
    }
}
module.exports.guilds = (guild, log) => {
    if(log.action != 'GUILD_UPDATE') return;            
    let alterado = "";               
    for(let c in log.changes){                   
        let antigo = "" + log.changes[c].old;                   
        let novo = "" + log.changes[c].new;                   
        let tipo = "" + log.changes[c].key;                   
        if(log.changes[c].key == 'default_message_notifications'){;                       
            novo = novo.replace('0','Todas as Mensagens').replace('1','Apenas @menções');                       
            antigo = antigo.replace('0','Todas as Mensagens').replace('1','Apenas @menções');                   
        };                   
        if(log.changes[c].key == 'afk_timeout'){                      
            novo = novo / 60 + " minuto(s)";                       
            antigo = antigo / 60 + " minuto(s)";                   
        }                   
        if(log.changes[c].key == 'system_channel_id' || log.changes[c].key == 'afk_channel_id'){                    
            if(novo != 'undefined') novo = guild.channels.get(novo).name;                    
            if(antigo != 'undefined') antigo = guild.channels.get(antigo).name;                   
        }

        tipo = tipo.replace('name','Nome').replace('region','Região')                   
        .replace('verification_level','Nível de Proteção').replace('explicit_content_filter','Filtro de Conteúdo Explícito').replace('afk_channel_id','Canal AFK')                   
        .replace('system_channel_id','Canal de Boas-Vindas').replace('afk_timeout','Tempo AFK').replace('widget_enabled','Widget Ativo?')                   
        .replace('icon_hash','Ícone ID').replace('owner','Dono(a)').replace('default_message_notifications','Configurações de Notificação Padrão')                   
        antigo = antigo.replace('true','Sim').replace('false','Não').replace('undefined','Não Definido!')                   
        novo = novo.replace('true','Sim').replace('false','Não').replace('undefined','Não Definido!')
        alterado = alterado + tipo + ": Antes: " + antigo + " -  Agora: " + novo + "\n";               
    }
    return new RichEmbed()               
    .setTitle(`Configurações do Servidor Atualizadas`)               
    .setColor('#ffffff')               
    .setDescription(`Atualizado por: ${log.executor.username}\nAtualizações: \`${alterado}\`\nTag: ${log.executor.username + "#" + log.executor.discriminator}\nMenção: <@${log.executor.id}>`)     
    .setTimestamp()
    }
module.exports.roles = (role, log) => {           
    if(log.action == 'ROLE_UPDATE'){           
        let alterado = "";           
        for(let c in log.changes){              
            let antigo = "" + log.changes[c].old;               
            let novo = "" + log.changes[c].new;               
            let tipo = "" + log.changes[c].key;               
            if(log.changes[c].key == 'permissions'){
                var antigas = log.changes[c].old //permsUtil.converterPermissoes(log.changes[c].old,true);
                var novas = log.changes[c].new//permsUtil.converterPermissoes(log.changes[c].new,true);
                let antes = "", depois = "";
                for(let n in novas){
                    if(novas[n].permitido && antigas[n].permitido) continue;
                    else if(!novas[n].permitido && !antigas[n].permitido) continue;
                    else antes = antes + antigas[n].valor + ": " + antigas[n].permitido + ", ";
                    depois = depois + novas[n].valor + ": " + novas[n].permitido + ", ";
                }
                antigo = depois.replace(/true/g,'Sim').replace(/false/g,'Não');
                novo = antes.replace(/true/g,'Sim').replace(/false/g,'Não');
               }
               tipo = tipo.replace('name','Nome').replace('permissions','Permissões').replace('mentionable','Mencionável?')
               .replace('hoist','Destacádo?').replace('color','Cor').replace('position','Posição')
               antigo = antigo.replace('true','Sim').replace('false','Não');
               novo = novo.replace('true','Sim').replace('false','Não');
               alterado = alterado + tipo + ": Antes: " + antigo + " -  Agora: " + novo + "\n";
           }
           return new RichEmbed()
               .setTitle(`Cargo Atualizado`)   
               .setColor('#ffffff')
               .setDescription(`Nome: ${role.name}\nAtualizado por: <@${log.executor.id}>\nMenção: <@&${role.id}>\n\nAlterações: \`${alterado}\``)
               .setTimestamp();
        }           
        else if(log.action == 'ROLE_DELETE'){               
            return new RichEmbed()
               .setTitle(`Cargo Deletado`)   
               .setColor('#ffffff')
               .setDescription(`Nome: ${role.name}\nDeletado por: <@${log.executor.id}>`)
               .setTimestamp();        
        }
        else if(log.action == 'ROLE_CREATE'){    
           return new RichEmbed()
               .setTitle(`Cargo Criado`)   
               .setColor('#ffffff')
               .setDescription(`Nome: ${role.name}\nCriado por: <@${log.executor.id}>\nMenção: <@&${role.id}>`)
               .setTimestamp();        
        }
}
module.exports.members = (member, log) =>{           
    if(log.action == 'MEMBER_UPDATE'){             
        let alterado = "";                
        let antigo = "" + log.changes[0].old;                 
        let novo = "" + log.changes[0].new;                 
        let tipo = "" + log.changes[0].key;                
        
        tipo = tipo.replace('nick','Apelido').replace('roles','Cargos')                 
        .replace('mute','Silenciado').replace('deaf','deaf').replace('channel','Canal');                 
        antigo = antigo.replace('true','Sim').replace('false','Não').replace('undefined','Não Definido!');                 
        novo = novo.replace('true','Sim').replace('false','Não').replace('undefined','Não Definido!');                  
        alterado = tipo + ": `Antes: " + antigo + " -  Agora: " + novo + "`";
      
        return new RichEmbed()
             .setTitle(`Membro ${log.target.tag} Atualizado!`)   
             .setColor('#ffffff')
             .setDescription(`Atualizado por: ${log.executor.username}\n${alterado}`)
             .addField(`Menções e Tags`,`<@${log.executor.id}> ${log.executor.username + "#" + log.executor.discriminator}\n<@${log.target.id}> ${log.target.username + "#" + log.target.discriminator}`)
             .setTimestamp();         
        }
        else if(log.action == 'MEMBER_ROLE_UPDATE'){
            let alterado = "";
            let cargoId = 0;

            if(log.changes[0].old) cargoId = log.changes[0].old[0].id;
            else cargoId = log.changes[0].new[0].id;              
            let cargo = guild.roles.get(cargoId) ? guild.roles.get(cargoId).name : "erro";    
                
            let tipo = "" + log.changes[0].key;
            tipo = tipo.replace('$remove','Removido').replace('$add','Adicionado');                
            alterado = tipo + ": @`" +cargo + "`";
     
            return new RichEmbed()
                .setTitle(`Cargos de ${log.target.username} Atualizados`)   
                .setColor('#ffffff')
                .setDescription(`Nome: ${log.target.username}\nAtualizado por: <@${log.executor.id}>\n${alterado}`)
                .addField(`Menções`,`Executor: <@${log.executor.id}>\nAlvo: <@${log.target.id}>\nCargo: <@&${cargoId}>`)
                .setTimestamp();
    }
}
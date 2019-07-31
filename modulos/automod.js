const { NaoPodeEnviarConvites, NaoPodeEnviarLinks } = require('../embeds.js');
const banish = require('to-zalgo/banish');
const { compareTwoStrings } = require('string-similarity');
const { Collection } = require('discord.js');
const StrikeDB = require('../database/strike.js');
module.exports = class AutoModeracao {
    constructor(moderacao, permissoes){
        this.permissoes = permissoes;
        this.automod = moderacao;
        this.warns = new Collection();
        this.init();
    }
    init(){/*
        StrikeDB.find({}, (erro, rows) => {
            if(erro) return console.error(erro);
            else if (rows) rows.forEach(row => {
                this.warns[row.servidor].push(new Warn(row));
            });
        })*/
    }
    strike(member, warn){/*
        let memberWarns = await this.warns[member.guild.id].filter(x => x.id == member.id);
        if(memberWarns){
            let lastWarn = memberWarns[0];
            for(let thisWarn in memberWarns){
                if(thisWarn.tempo < lastWarn.tempo)
                    lastWarn = thisWarn;
            }

            if(memberWarns.size >= warn.max){
                lastWarn.lastAction == warn.actions[0] ? (warn.actions[0] == 'BAN' ? await member.ban('Limit of invite warns') : await member.kick('Limit of invite warns'));
            }
        }
        new StrikeDB({
            id: member.id,
            servidor: member.guild.id,
            motivo: 'Limit of invite warns',
            aplicadoPor: 'Phoenix',
            tempo: {
                expiravel: false,
                expiraEm: -1
            }
        }).save();*/
    }
    onMessage(message){
        if(this.automod.enabled){
            if(this.automod.flood.enabled)
            {
                if(this.users[message.author.id].messages > this.automod.flood.messages && 
                    this.users[message.author.id].lastMessage == message.content){
                    this.punir(message.member);
                }
            }
            else if(this.automod.spam.enabled){
                if(Date.now() - this.users[message.author.id].lastMessageTimestamp < 300){
                    this.punir(message.member);
                }
            }
            this.users[message.author.id].messages++;
            this.users[message.author.id].lastMessage = message.content;
            this.users[message.author.id].lastMessageTimestamp = message.createdAt;

            if(this.automod.convites.enabled && !this.permissoes.canSendInvite(message.member))
                this.convites(message);
            
            if(this.automod.links.enabled && !this.permissoes.canSendLink(message.member))
                this.convites(message);
        }
    }
    convites(message){
        if(message.content.match(/discord(?:app\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gi)){
            message.delete().catch();
            message.channel.send(new NaoPodeEnviarConvites(message.author.id));
            if(this.automod.convites.warn.enabled)
                this.punir(message.member);
        }
    }
    links(message){
        if(this.automod.links.whitelist.includes(message.channel.id)){
            if(message.content.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)){
                message.delete().catch();
                message.channel.send(new NaoPodeEnviarLinks(message.author.id));
                if(this.automod.links.warn.enabled)
                    this.punir(message.member);
            }
        }
    }
    async antiZalgo(membro){
        if(this.automod.nome.zalgo.enabled){
            if(await compareTwoStrings(await banish(membro.displayName), membro.displayName) < 
            this.automod.zalgo.percent / 100)
            await membro.setNickname(`NãoMencionável${Math.random() * 100}`).catch();
        }
    }
    async mencionavel(membro){
        if(this.automod.nome.mencionavel.enabled){
            if(membro.displayName != membro.displayName.replace(/[^\w ]/gi, '') && 
            this.automod.nome.mencionavel.rename)
            await membro.setNickname(`NãoMenPUMcionável${Math.random() * 100}`).catch();
        }
    }
}

class Warn {
    constructor(warn){
        this.id = warn.id,
        this.servidor = warn.servidor,
        this.motivo = warn.motivo,
        this.aplicadoPor = warn.aplicadoPor,
        this.lastAction = warn.lastAction,
        this.expiraEm = warn.expiraEm,
        this.tempo = warn.tempo
    }
}
const { Collection } = require('discord.js');
const { readdir,readdirSync,statSync } = require('fs');
const { join } = require('path');
const { ComandoBotSemPermissao, ComandoDesativado, ComandoSemPermissao, ComandoErro } = require('../embeds.js');
const moment = require('moment');

module.exports = class CommandManager{
    constructor(client, path = './comandos/'){
        this.client = client;
        this.comandos = new Collection();
        this.aliases = new Collection();
        this.local = path;
        this.init();
    }
    init(){
        const modulos = readdirSync(this.local).filter(file => statSync(join(this.local, file)).isDirectory());
        for(let modulo of modulos){
            readdir(`${this.local}${modulo}/`, (err, arquivos) => {
            if (err) console.error(err);
            else arquivos.forEach(arquivo => {
                    let cmd = require(`.${this.local}${modulo}/${arquivo}`);
                    let comando = new cmd(this.client);
                    console.log(`[${moment().format('HH:mm:ss')}] Carregando comando: "${comando.nome}"...`);
                    this.comandos.set(comando.nome.toLowerCase(), comando);
                    comando.aliases.forEach(alias => {
                    this.aliases.set(alias.toLowerCase(), comando.nome.toLowerCase());
                });
            });
        })}
        console.log(`Carregando ${this.comandos.size} comandos`);
        
        this.ready()
    }
    ready(){
        console.log(`[COMANDOS] >> Pronto!`);
        this.client.comando = async (message) => {
            let servidor = this.client.getServidor(message.guild.id);
            if (message.content.startsWith(servidor.prefixo)){
                let args = message.content.split(' ');
                let comando = args.shift().slice(servidor.prefixo.length).toLowerCase();
                if(comando.length == 0) return;

                let cmd = this.comandos.get(comando) || this.comandos.get(this.aliases.get(comando));
                if (cmd) {
                    try{
                        if(cmd.ativo(message.author.id))
                            if(cmd.userHasPermission(message))
                                if(cmd.botHasPermission(message))
                                    cmd.run(message.client, message, args);
                                else message.channel.send(new ComandoBotSemPermissao(cmd, permissaoBot));
                            else message.channel.send(new ComandoSemPermissao(cmd, cmd.permissoes));
                        else message.channel.send(new ComandoDesativado(cmd));
                    }
                    catch (erro){
                        message.channel.send(new ComandoErro(cmd));
                        console.error(erro);
                    }
                }
                else 
                    return message.reply(`Não existe comando chamado \`${comando}\`!`);
            }
        }
    }
}
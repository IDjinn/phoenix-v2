
const { Comando } = require('../../');
const { RichEmbed } = require('discord.js');
module.exports = class Eval extends Comando{
  constructor(client){
    super(client, {
    nome: 'eval',
    descricao: 'Faz coisas incríveis!'
    })
  }
  async run(client, message, args) {
    const ID = "376460601909706773";
    function clean(text) { if (typeof(text) === "string") 
        return text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replace(/\n/g, '\n' + String.fromCharCode(8203))
    }

    if(message.author.id !== ID) 
        return message.reply("Você não tem permissão para usar esse comando!").then(msg => { msg.delete(3000) }).catch(/*ERRO!*/);
    else try {
            const code = args.join(" ");
            let evaled = eval(code);
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
                const embed = new RichEmbed()
                .setDescription(`Entrada \`\`\`${message.content}\`\`\`\n\nSaída:\`\`\`${clean(evaled)}\`\`\``)
                .setColor('#ffffff');
                return message.reply(embed);
            } catch (err) { 
                const embed = new RichEmbed()
                .setDescription(`Entrada \`\`\`${message.content}\`\`\`\n\nSaída:\`\`\`${clean(err)}\`\`\``)
                .setColor('#ffffff');
                return message.reply(embed);
        }
    }
}
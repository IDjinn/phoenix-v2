const { Comando } = require('../../');
const { RichEmbed } = require('discord.js');
module.exports = class EuSou extends Comando{
  constructor(client){
    super(client, {
    nome: 'EuSou',
    descricao: 'Você é ??% alguma coisa!',
    aliases: ['iam']
    })
  }
  async run(client, message, args) {
    let porcentagem = Math.floor((Math.random() * 100) + 1)
    let mensagem = args.join(" ");
    if(!mensagem) mensagem = "nada";
    
    message.reply(new RichEmbed()
    .setColor('#ffffff')
    .setTitle(`Você é...`)
    .setThumbnail(message.author.avatarURL)
    .setDescription(`Você é ${porcentagem}% ${args}!`))
    return;
  }
}
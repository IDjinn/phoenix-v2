const { Comando } = require('../..');
const { SimpleEmbed } = require('../../embeds.js'); 
const { RichEmbed } = require('discord.js');
module.exports = class Anunciar extends Comando{
  constructor(client){
    super(client, {
    nome: 'Anunciar',
    descricao: 'Envia um anúncio para o canal de anúncio.',
    permissoes: ['ADM']
    })
  }
  async run(client, message, args) {
    const filtro = m => m.author.id == message.author.id;
    let titulo = args.join(" ");
    if(!titulo)
      return message.reply(new SimpleEmbed('Você não escolheu o título!'));

    let servidor = await client.getServidor(message.guild.id);
    await message.channel.send("Qual será a descrição do anúncio?");
    message.channel.awaitMessages(filtro, { max: 1, time: 30000, errors: ['time'] })
    .then(async c => {
      const embed = new RichEmbed()
      .setTitle(`${titulo}`)   
      .setColor('#ffffff')
      .setDescription(`${c.first().content}`)
      .setFooter(`${message.author.tag}`, ` ${message.author.avatarURL}`)
      .setTimestamp()
      //if(!servidor.anunciar.enabled)
        return message.channel.send(embed).catch();
      //else{
        let canal = await message.guild.channels.get(servidor.anunciar.canal)
        if(canal) canal.send(embed).catch();
      //}
    }).catch();
  }
}
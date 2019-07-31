const { Comando } = require('../../')
module.exports = class Convite extends Comando{
  constructor(client){
    super(client, {
    nome: 'Convite',
    descricao: 'Solicita o convite para adicionar o Phoenix.'
    })
  }
  async run(client, message, args) {
    return message.reply(`\nMe adicione: **[Clique Aqui](https://discordapp.com/oauth2/authorize?client_id=503239059775422491&scope=bot&permissions=8)** Convite do Servidor de Suporte: **[Convite](https://discord.gg/AFkv9rk)**`,false)
  }
}
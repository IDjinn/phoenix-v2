const { Comando } = require('../../')
module.exports = class Ping extends Comando{
  constructor(client){
    super(client, {
    nome: 'Ping',
    descricao: 'Mostra a latência do bot.'
    })
  }
  async run(client, message, args) {
    return message.reply(`Pong! ${Math.round(client.ping)}ms`);
  }
}
const { Comando } = require('../..')
const { unix } = require('moment');
const parseDate = (milis) => unix(milis).format("D hh:mm");
module.exports = class Online extends Comando{
  constructor(client){
    super(client, {
      nome: 'online',
      descricao: 'Mostra quanto tempo você ficou online no discord.'
    })
  }
  async run(client, message, args) {
    const user = client.getUser(message.author.id);
    user.salvarTempoOnline();
    return message.reply(await `Você ficou ${parseDate(user.tempoOnline)} segundos online.`)
  }
}
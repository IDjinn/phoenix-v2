const { Comando } = require('../..');
const TicketDB = require('../../database/ticket.js');

module.exports = class FecharTicket extends Comando{
  constructor(client){
    super(client, {
    nome: 'FecharTicket',
    descricao: 'Fecha o seu último ticket aberto.',
    permissaoBot: ['MANAGE_CHANNELS'],
    apenasCriador: true,
    })
  }
  async run(client, message, args) {
    TicketDB.find({usuario: message.author.id, servidor: message.guild.id}, async(erro, rows) => {
      if(erro) return console.error(erro);
      else if (rows.length > 0) {
        let canal = message.guild.channels.get(rows[0].canal);
        let cargo = message.guild.roles.get(rows[0].cargo);
        if(canal || cargo){
          canal.delete().catch();
          cargo.delete().catch();
          TicketDB.findOneAndDelete({usuario: message.author.id, servidor: message.guild.id});
        }
      }
      else {
        return message.channel.send('Você não tem nenhum ticket aberto!');
      }
    });
  }
}
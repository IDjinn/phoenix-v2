const { Comando } = require('../..');
const TicketDB = require('../../database/ticket.js');

module.exports = class CriarTicket extends Comando{
  constructor(client){
    super(client, {
    nome: 'CriarTicket',
    descricao: 'Abre um novo ticket.',
    permissaoBot: ['MANAGE_CHANNELS'],
    apenasCriador: true,
    })
  }
  async run(client, message, args) {
    TicketDB.find({usuario: message.author.id, servidor: message.guild.id}, async(erro, rows) => {
      if(erro) return console.error(erro);
      else if (rows.length > 0) {
        let canal = message.guild.channels.get(rows[0].canal);
        if(canal)
          return message.reply(`Você já criou um ticket, o canal <#${canal.id}>`);
      }
      else {
        let TicketID = Math.floor(Math.random() * 10000 + 1);
        let cargo = await message.guild.createRole({
                name: TicketID,
                permissions: []
        });
        message.member.addRole(cargo).catch().catch();
        message.guild.createChannel('ticket-' + TicketID, 'text').then(async channel => {
                await channel.overwritePermissions(message.guild.roles.find(c => c.name == '@everyone'), {
                'CREATE_INSTANT_INVITE' : false,        'VIEW_CHANNEL': false,
                'CONNECT': false,                       'SPEAK': false
                }).catch();
                await channel.overwritePermissions(cargo,{
                'VIEW_CHANNEL': true,                   'CONNECT': true,            'SPEAK': true,
                }).catch();
            message.channel.send(`Canal criado com sucesso, acesse <#${channel.id}>`);
            new TicketDB({
              id: TicketID,
              canal: channel.id,
              cargo: cargo.id,
              criadoEm: Date.now(),
              servidor: message.guild.id,
              usuario: message.author.id
            }).save();
        });
      }
    });
  }
}
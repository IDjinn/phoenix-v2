const { Comando } = require('../..');
const milisegundos = require('milisegundos');
const TempRoleDB = require('../../database/temprole.js');
module.exports = class TempRole extends Comando{
  constructor(client){
    super(client, {
    nome: 'TempRole',
    descricao: 'Adiciona um cargo durante determinado período de tempo.',
    uso: '<@usuário> <@cargo> <tempo>',
    permissoesBot: ['MANAGE_ROLES'],
    permissoes: ['ADM']
    })
  }
  async run(client, message, args) {
    let membro = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!membro) return message.reply('Você precisa mencionar alguém!');
    
    let role = message.mentions.roles.first() || message.guild.roles.get(args[1]);
    if(!role) return message.reply('Você precisa mencionar um cargo!');

    if(!role.manageable)
    return message.reply(`Não consigo dar esse cargo para ${membro}!`);

    let tempo = milisegundos(args.slice(2).join(' '));
    if(!tempo) return message.reply('Diga um tempo válido!');
    
    let temprole = new TempRoleDB({              
      servidor: message.guild.id,              
      id: role.id,              
      usuario: membro.id,              
      criadoEm: Date.now(),
      expiraEm: Date.now() + tempo
    });
    temprole.save();
    client.addTempRole(temprole);
          
    membro.addRole(role).catch();          
    message.reply(`TempRole configurado com sucesso!`);
  }
}
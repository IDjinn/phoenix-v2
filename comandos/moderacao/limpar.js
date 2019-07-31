const { Comando } = require('../../')
module.exports = class Limpar extends Comando{
  constructor(client){
    super(client, {
    nome: 'Limpar',
    descricao: 'Limpa as últimas x mensagens enviadas (limite de 300).',
    permissoes: ['MANAGE_MESSAGES']
    })
  }
  async run(client, message, args) {
      if(isNaN(args[0]) || args[0] > 100 || args[0] < 1) 
        return message.reply("Você deve escolher um valor válido! (1-100)");
        
      message.channel.bulkDelete(--args[0], true).then(() => message.reply("Chat limpo com sucesso!"));
  }
}
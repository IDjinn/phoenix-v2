const { Comando } = require('../..');
module.exports = class SelfBan extends Comando{
  constructor(client){
    super(client, {
    nome: 'SelfBan',
    descricao: 'Aplica banimento nas últimas `x` pessoas que entraram no servidor.',
    permissaoBot: ['BAN_MEMBERS'],
    permissoes: ['ADM']
    })
  }
  async run(client, message, args) {
    if(isNaN(args[0])) return message.reply('Isso não é um número válido!');

    const servidor = await client.getServidor(message.guild.id);
    if(servidor.antiraid.listaUtimosMembros.length == 0) return message.reply('Nenhum usuário entrou no servidor recentemente.');
    
    let quantidade = args[0];
    if(quantidade > servidor.antiraid.listaUtimosMembros.length) quantidade = servidor.antiraid.listaUtimosMembros.length;

    let banidos = 0, erros = 0;
    for(let i = quantidade; i >= 0; i--){
        let membro = await message.guild.members.get(servidor.antiraid.listaUtimosMembros.pop());
        if(membro) await membro.ban().then(() => banidos += 1).catch(() => erros += 1);
    }
    return message.channel.send(`Sucesso! Banidos: ${banidos}, erros: ${erros}`);
  }
}
const { Comando } = require('../../');
const BackupDB = require('../../database/backup.js');
module.exports = class CriarBackup extends Comando{
  constructor(client){
    super(client, {
    nome: 'CriarBackup',
    descricao: 'Cria um backup do servidor.'
    })
  }
  async run(client, message, args) {
      new BackupDB({
          id: message.guild.id,
          json: await this.client.createBackup(message.guild)
      }).save();
      return message.channel.send('Criado com sucesso!');
  }
}
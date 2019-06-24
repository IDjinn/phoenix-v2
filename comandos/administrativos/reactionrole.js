const { Comando } = require('../../');
const ReactionDB = require('../../database/reactionrole.js');
module.exports = class ReactionRole extends Comando{
  constructor(client){
    super(client, {
    nome: 'ReactionRole',
    descricao: 'Dê cargos usando reações.',
    permissaoBot: ['MANAGE_ROLES'],
    permissoes: ['ADM']
    })
  }
  async run(client, message, args) {
    const filter = (reaction, user) => user.id === message.author.id;
    const filtro = m => m.author.id == message.author.id;

    await message.channel.send(`Em qual canal a mensagem está? (mencione ou use o id)`);
    await message.channel.awaitMessages(filtro, { max: 1, time: 300000, errors: ['time'] })
    .then(async m => {
    let canal = m.first().mentions.channels.first() || message.guild.channels.get(m.first().content);
    if(!canal) return message.channel.send("Canal não encontrado!");

    await message.channel.send(`Qual o ID da Mensagem?`);
    await message.channel.awaitMessages(filtro, { max: 1, time: 300000, errors: ['time'] })
    .then(async msg => {
    let mensagemID = msg.first().content
    if(!mensagemID) return message.channel.send("Mensagem não encontrada!");

    var emoji;
    await message.channel.send(`Reaja com o emoji nesta mensagem que deseja ter como reaction role`)
    .then(async m =>{
    const collector = m.createReactionCollector(filter, { time: 300000 });
    collector.on('collect', async a => {
        if(a.emoji.id) emoji = a.emoji.id;
        else emoji = a.emoji.name;
        canal.fetchMessage(mensagemID).catch(() => { 
            emoji = undefined;
            return message.channel.send("Parece que essa mensagem não existe, ou eu não consegui encontrá-la.");
        })
        .then(m => m.react(`${emoji}`));

    if(!emoji) return message.channel.send(`Ocorreu um erro quando tentei pegar esse emoji!`);
    var role;
    
    await message.channel.send("Agora, mencione (ou use o id) do cargo para o reaction role.");
    await message.channel.awaitMessages(filtro, { max: 1, time: 300000, errors: ['time'] })
    .then(async m => {
        let msg = m.first();
        role = await msg.mentions.roles.first() || await msg.guild.roles.get(msg.content);
        if(!role) return message.channel.send(`Você não definiu um cargo válido.`);

        const ReactionRole = new ReactionDB({
            role: role.id,
            mensagem: mensagemID,
            servidor: message.guild.id,
            canal: canal.id,
            emoji: emoji
        });
        client.addReactionRole(ReactionRole);
        ReactionRole.save();

        message.channel.send(`Reaction-Role configurado com sucesso!`);
})
})})
})})}}
const { RichEmbed } = require('discord.js');

module.exports.SimpleEmbed = class SimpleEmbed extends RichEmbed {
    constructor(mensagem){
        super();
        this.setDescription(`${mensagem}`);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}

module.exports.ComandoDesativado = class ComandoDesativado extends RichEmbed {
    constructor(comando){
        super();
        this.setTitle(`Comando Desativado`);
        this.setDescription(`O comando ${comando.nome} está em manutenção, e por conta disso não pode ser utilizado.`);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}

module.exports.ComandoSemPermissao = class ComandoSemPermissao extends RichEmbed {
    constructor(comando, permissaoFaltando){
        super();
        this.setTitle(`Sem Permissão`);
        this.setDescription(`Para usar o comando ${comando.nome}, você precisa da permissão ${permissaoFaltando} para poder ser executado.`);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}

module.exports.ComandoBotSemPermissao = class ComandoBotSemPermissao extends RichEmbed {
    constructor(comando, permissaoFaltando){
        super();
        this.setTitle(`Estou Sem Permissão`);
        this.setDescription(`Para usar o comando ${comando.nome}, eu preciso da permissão ${permissaoFaltando} para poder executá-lo.`);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}

module.exports.ComandoErro = class ComandoErro extends RichEmbed {
    constructor(comando){
        super();
        this.setTitle(`Erro!`);
        this.setDescription(`Tentei executar o comando ${comando.nome}, mas ocorreu um erro inesperado. Este será solucionado em breve pelo meu criador.`);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}

module.exports.ComandoNaoEncontrado = class ComandoNaoEncontrado extends RichEmbed {
    constructor(comando, similares){
        super();
        this.setTitle(`Oops!`);
        this.setDescription(`Tentei encontrar um comando chamado ${comando}, mas não achei nenhum. Verifique se queria dizer algum desses: \`\`\`${similares}\`\`\``);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}

module.exports.NaoPodeEnviarConvites = class NaoPodeEnviarConvites extends RichEmbed {
    constructor(user){
        super();
        this.setTitle(`Ei!`);
        this.setDescription (`<@${user}>, você não pode enviar convites aqui!`);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}

module.exports.NaoPodeEnviarLinks = class NaoPodeEnviarLinks extends RichEmbed {
    constructor(user){
        super();
        this.setTitle(`Ei!`);
        this.setDescription (`<@${user}>, você não pode enviar links aqui!`);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}

module.exports.WelcomeEmbed = class WelcomeEmbed extends RichEmbed {
    constructor(user, servidor){
        super();
        this.setTitle(`Seja bem-vind@!`);
        this.setDescription (`<@${user}>, seja muito bem-vind@ ao ${servidor}!`);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}

module.exports.LeaveEmbed = class LeaveEmbed extends RichEmbed {
    constructor(user){
        super();
        this.setTitle(`Até logo!`);
        this.setDescription (`<@${user}>, espero que isso não seja um adeus...`);
        this.setTimestamp();
        this.setColor('#ffffff');
    }
}
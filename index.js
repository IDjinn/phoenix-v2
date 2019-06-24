const { Client, Collection } = require('discord.js');
const config = require('./config.js');
const Database = require('./estruturas/database.js');
const ServidoresManager = require('./managers/servidores.js');
const ComandosManager = require('./managers/comandos.js');
const EventosManager = require('./managers/eventos.js');
const UsersManager = require('./managers/usuarios.js');
const TempRoleManager = require('./managers/temprole.js');
const ReactionRoleManager = require('./managers/reactionrole.js');
const App = require('./app.js');
module.exports = { Comando: require('./estruturas/comando.js') }
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

new class Phoenix extends Client{
  constructor(){
      super();
      this.disableEveryone = true,
      this.messageCacheMaxSize = 45,
      this.fetchAllMembers = true,
      this.start();
  }
  start() { 
    this.login(config.token); 
    this.comandos = new Collection();
    this.aliases = new Collection();
    this.usuarios = new Collection();
    this.config = config;
    this.load();
  }
  async load(){  
    this.databaseManager = await new Database(this, config.mongoose.login);
    this.servidoresManager = await new ServidoresManager(this);
    this.usersManager = await new UsersManager(this);
    this.comandosManager = await new ComandosManager(this);
    this.tempRoleManager = await new TempRoleManager(this);
    this.reactionRoleManager = await new ReactionRoleManager(this);
    //this.app = await new App(this);

    await sleep(3000);
    this.eventosManager = await new EventosManager(this);
    
    this.on('ready', async () => {
      console.log(`Conectado com sucesso ${this.user.tag}!`);
    });
  }
}



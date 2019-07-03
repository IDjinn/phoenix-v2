const BackupDB = require('../database/backup.js');
const { Collection } = require('discord.js');
const Serializer = require('../utilitarios/serializer.js');

module.exports = class Backup{
    constructor(client){
        this.client = client;
        this.servidores = new Collection(); 
        this.client.createBackup = async (guild) => await this.createBackup(guild);
    }
    async init(){
        await BackupDB.find({}, (erro, rows) => {
            if(erro) return console.error(erro);
            else if(rows) rows.forEach(row => {
                this.servidores[row.id] = row;
            });
        });
        console.log(`[BACKUP] - Carregado ${this.servidores.size} backups!`);
    }
    async createBackup(guild) {
        let json = await Serializer.serializeOldGuild(guild, await guild.fetchBans());
        this.servidores[guild.id] = json;
        return json;
    }
}
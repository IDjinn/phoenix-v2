const { Collection } = require('discord.js');
module.exports = class OnlineManager {
    constructor(client, users){
        this.client = client;
        this.usuarios = users;
        this.init();
    }
    async init(){
        setInterval(() => {
            this.client.users.forEach(user => {
                if(!this.usuarios[user.id])
                    this.usuarios[user.id] = this.client.getUser(user.id);
                if(user.presence.status != "offline"){
                    this.usuarios[user.id].status = user.presence.status;
                    this.usuarios[user.id].onlinePing();
                }
                else if(this.usuarios[user.id]) {
                    this.usuarios[user.id].salvarTempoOnline();
                }
            });
        }, 1000);
    }
}
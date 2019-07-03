const fs = require('fs');

module.exports = class Serializer {
    
    static serializeOldGuild(guild, bans) {
        if (!guild.available) return;

        let guildData = {};

        guildData.general = this.getGeneralData(guild);
        guildData.roles = guildData.roles = this.serializeRoles(guild);
        guildData.categories = this.serializeCategories(guild);
        guildData.textChannel = this.serializeTextChannels(guild);
        guildData.voiceChannel = this.serializeVoiceChannels(guild);
        guildData.emojis = this.serializeEmojis(guild);
        guildData.bans = this.serializeBans(bans);

        return JSON.stringify(guildData);
    }
    
    static getGeneralData(guild) {
        return {
            name: guild.name,
            region: guild.region,
            icon: guild.iconURL,
            verificationLevel: guild.verificationLevel,
            afkTimeout: guild.afkTimeout,
            explicitContentFilter: guild.explicitContentFilter,
        };
    }
    
    static serializeRoles(guild) {
        let roleCol = guild.roles.sort((a, b) => b.position - a.position);
        let roles = roleCol.map(role => {
            return {
                idOld: role.id,
                name: role.name,
                hexColor: role.hexColor,
                hoist: role.hoist,
                mentionable: role.mentionable,
                position: role.position,
                rawPosition: role.rawPosition,
                defaultRole: guild.defaultRole.id === role.id,
                permBitfield: role.permissions.bitfield,
            };
        });

        return roles;
    }
    
    static serializeCategories(guild) {
        let categoryCollection = guild.channels.filter(c => c.type === 'category');
        categoryCollection = categoryCollection.sort((a, b) => a.position - b.position);
        let categories = categoryCollection.map(category => {
            let permOverwritesCollection = category.permissionOverwrites.filter(pOver => pOver.type === 'role');
            permOverwritesCollection = permOverwritesCollection.filter(pOver => guild.roles.has(pOver.id));
            let permOverwrites = permOverwritesCollection.map(pOver => {
                return {
                    id: pOver.id,
                    allowed: pOver.allow.bitfield,
                    denied: pOver.deny.bitfield,
                };
            });

            return {
                idOld: category.id,
                name: category.name,
                position: category.position,
                rawPosition: category.rawPosition,
                permOverwrites: permOverwrites,
            };
        });

        return categories;
    }
    
    static serializeTextChannels(guild) {
        let textChannelCollection = guild.channels.filter(c => c.type === 'text');
        textChannelCollection = textChannelCollection.sort((a, b) => a.rawPosition - b.rawPosition);
        let textChannel = textChannelCollection.map(tCh => {
            let permOverwritesCollection = tCh.permissionOverwrites.filter(pOver => pOver.type === 'role');
            permOverwritesCollection = permOverwritesCollection.filter(pOver => guild.roles.has(pOver.id));
            let permOverwrites = permOverwritesCollection.map(pOver => {
                return {
                    id: pOver.id,
                    allowed: pOver.allow.bitfield,
                    denied: pOver.deny.bitfield,
                };
            });

            return {
                id: tCh.id,
                name: tCh.name,
                topic: tCh.topic,
                nsfw: tCh.nsfw,
                isSystemChannel: guild.systemChannelID === tCh.id,
                position: tCh.position,
                rawPosition: tCh.rawPosition,
                parentCat: tCh.parentID,
                permLocked: tCh.permissionsLocked ? tCh.permissionsLocked : false,
                permOverwrites: tCh.permissionsLocked ? null : permOverwrites,
            };
        });

        return textChannel;
    }
    
    static serializeVoiceChannels(guild) {
        let voiceChannelCollection = guild.channels.filter(c => c.type === 'voice');
        voiceChannelCollection = voiceChannelCollection.sort((a, b) => a.rawPosition - b.rawPosition);
        let voiceChannel = voiceChannelCollection.map(vCh => {
            let permOverwritesCollection = vCh.permissionOverwrites.filter(pOver => pOver.type === 'role');
            permOverwritesCollection = permOverwritesCollection.filter(pOver => guild.roles.has(pOver.id));
            let permOverwrites = permOverwritesCollection.map(pOver => {
                return {
                    id: pOver.id,
                    allowed: pOver.allow.bitfield,
                    denied: pOver.deny.bitfield,
                };
            });

            return {
                id: vCh.id,
                name: vCh.name,
                position: vCh.position,
                rawPosition: vCh.rawPosition,
                parentCat: vCh.parentID,
                bitrate: vCh.bitrate,
                userLimit: vCh.userLimit,
                isAfkChannel: guild.afkChannelID === vCh.id,
                permLocked: vCh.permissionsLocked ? vCh.permissionsLocked : false,
                permOverwrites: vCh.permissionsLocked ? null : permOverwrites,
            };
        });

        return voiceChannel;
    }

    static serializeEmojis(guild) {
        return guild.emojis.map(emoji => {
            return {
                name: emoji.name,
                url: emoji.url,
            };
        });
    }
    
    static serializeBans(banCollection) {
        return {};
        return banCollection.map(ban => {
            return {
                userId: ban.user.id,
                reason: ban.reason || null,
            };
        });
    }
}

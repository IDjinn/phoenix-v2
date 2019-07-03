const { copyEmojis, copyBans, hotelName } = require('../settings.json');
const { Permissions, Collection } = require('discord.js');
const Discord = require('discord.js');

const validateBitrate = origBitrate => {
    if (origBitrate > 96000) return 96000;
    else if (origBitrate < 8000) return 8000;
    else return origBitrate;
};

const validateUserLimit = userLimit => {
    if (userLimit < 0) return 0;
    else if (userLimit > 99) return 99;
    else return userLimit;
};

module.exports = class Creator {
    static setData(client, guildData, newGuildId, newGuildAdminRoleId, translator) {
        return new Promise(async (resolve, reject) => {
            try {
                let newGuild = client.guilds.get(newGuildId);
                guildData.references = {};

                await this.setGeneralData(guildData, newGuild);

                if (guildData.roles.length) {
                    guildData.references.roles = await this.createRoles(guildData, newGuild, translator);
                }

                if (guildData.categories.length) {
                    guildData.references.categories = await this.createCategories(guildData, newGuild, translator);
                }

                if (guildData.textChannel.length) {
                    await this.createTextChannel(guildData, newGuild, translator);
                }

                if (guildData.voiceChannel.length) {
                    await this.createVoiceChannel(guildData, newGuild, translator);
                }

                if (copyEmojis && guildData.emojis.length) {
                    await this.createEmojis(guildData, newGuild, translator);
                }

                if (copyBans && guildData.bans.length) {
                    guildData = await this.createBans(guildData, newGuild, translator);
                }

                return resolve(guildData);
            } catch (err) {
                return reject(err);
            }
        });
    }
    
    static setGeneralData(guildData, newGuild) {
        return new Promise(async (resolve, reject) => {
            try {
                let general = guildData.general;
                let allowedRegions = ['brazil', 'us-west', 'singapore', 'eu-central', 'hongkong',
                    'us-south', 'amsterdam', 'us-central', 'london', 'us-east', 'sydney', 'japan',
                    'eu-west', 'frankfurt', 'russia'];
                let region = allowedRegions.includes(general.region) ? general.region : 'brazil';

                await newGuild.setName(general.name.replace(/{hotel}/, hotelName));
                await newGuild.setRegion(region);
                await newGuild.setIcon(general.icon);
                await newGuild.setVerificationLevel(general.verificationLevel);
                await newGuild.setExplicitContentFilter(general.explicitContentFilter);

                return resolve();
            } catch (err) {
                return reject(err);
            }
        });
    }
    
    static createRoles(guildData, newGuild, translator) {
        return new Promise(async (resolve, reject) => {
            try {
                let counter = 1;
                let promises = [];
                let roleReferences = new Collection();
                guildData.roles.forEach(role => {
                    if (role.defaultRole) {
                        // Edit existing @everyone
                        let everyoneRole = newGuild.defaultRole;
                        promises.push(everyoneRole.setPermissions(role.permBitfield));
                        roleReferences.set(role.idOld, { new: newGuild.defaultRole, old: role });
                    } else {
                        // Create new role
                        let newRole = {
                            data: {
                                name: role.name.replace(/{hotel}/, hotelName),
                                color: role.hexColor,
                                hoist: role.hoist,
                                mentionable: role.mentionable,
                                permissions: role.permBitfield,
                            },
                        };

                        let promise = newGuild.roles.create(newRole).then(createdRole => {
                            roleReferences.set(role.idOld, { new: createdRole, old: role });
                        });
                        promises.push(promise);
                    }
                });

                await Promise.all(promises);

                return resolve(roleReferences);
            } catch (err) {
                return reject(err);
            }
        });
    }
    
    static createCategories(guildData, newGuild, translator) {
        return new Promise(async (resolve, reject) => {
            try {
                let counter = 1;
                let promises = [];
                let categoryReferences = new Collection();
                guildData.categories.forEach(category => {
                    let overwrites = category.permOverwrites.map(permOver => {
                        return {
                            id: guildData.references.roles.get(permOver.id).new.id,
                            allow: new Permissions(permOver.allowed),
                            deny: new Permissions(permOver.denied),
                        };
                    });
                    let options = {
                        type: 'category',
                        permissionOverwrites: overwrites,
                    };

                    let promise = newGuild.channels.create(category.name.replace(/{hotel}/, hotelName), options).then(createdCategory => {
                        categoryReferences.set(category.idOld, { new: createdCategory, old: category });
                    });
                    promises.push(promise);
                });

                await Promise.all(promises);

                return resolve(categoryReferences);
            } catch (err) {
                return reject(err);
            }
        });
    }
    
    static createTextChannel(guildData, newGuild, translator) {
        return new Promise(async (resolve, reject) => {
            try {
                let counter = 1;
                let promises = [];
                let newSystemChannel = null;
                let channelWithTopics = new Collection();
                guildData.textChannel.forEach(textChannel => {
                    let options = {
                        type: 'text',
                        nsfw: textChannel.nsfw,
                    };
                    if (textChannel.parentCat) {
                        options.parent = guildData.references.categories.get(textChannel.parentCat).new.id;
                    }
                    if (!textChannel.permLocked) {
                        options.permissionOverwrites = textChannel.permOverwrites.map(permOver => {
                            return {
                                id: guildData.references.roles.get(permOver.id).new.id,
                                allow: new Permissions(permOver.allowed),
                                deny: new Permissions(permOver.denied),
                            };
                        });
                    }

                    let promise = newGuild.channels.create(textChannel.name.replace(/{hotel}/, hotelName), options).then(createdChannel => {
                        if (textChannel.isSystemChannel) newSystemChannel = createdChannel.id;
                        if (textChannel.topic) channelWithTopics.set(createdChannel.id, { newCh: createdChannel, topic: textChannel.topic });
                    });
                    promises.push(promise);
                });

                await Promise.all(promises);
                if (newSystemChannel) await newGuild.setSystemChannel(newSystemChannel);
                promises = [];
                channelWithTopics.forEach(ch => promises.push(ch.newCh.setTopic(ch.topic)));
                await Promise.all(promises);

                return resolve();
            } catch (err) {
                return reject(err);
            }
        });
    }
    
    static createVoiceChannel(guildData, newGuild, translator) {
        return new Promise(async (resolve, reject) => {
            try {
                let counter = 1;
                let promises = [];
                let newAfkChannel = null;
                guildData.voiceChannel.forEach(voiceChannel => {
                    let options = {
                        type: 'voice',
                        bitrate: validateBitrate(voiceChannel.bitrate),
                        userLimit: validateUserLimit(voiceChannel.userLimit),
                    };
                    if (voiceChannel.parentCat) {
                        options.parent = guildData.references.categories.get(voiceChannel.parentCat).new.id;
                    }
                    if (!voiceChannel.permLocked) {
                        options.permissionOverwrites = voiceChannel.permOverwrites.map(permOver => {
                            return {
                                id: guildData.references.roles.get(permOver.id).new.id,
                                allow: new Permissions(permOver.allowed),
                                deny: new Permissions(permOver.denied),
                            };
                        });
                    }

                    let promise = newGuild.channels.create(voiceChannel.name.replace(/{hotel}/, hotelName), options).then(createdChannel => {
                        if (voiceChannel.isAfkChannel) newAfkChannel = createdChannel.id;
                    });
                    promises.push(promise);
                });

                await Promise.all(promises);
                if (newAfkChannel) await newGuild.setAFKChannel(newAfkChannel);
                await newGuild.setAFKTimeout(guildData.general.afkTimeout);

                return resolve();
            } catch (err) {
                return reject(err);
            }
        });
    }
    
    static createEmojis(guildData, newGuild, translator) {
        return new Promise(async (resolve, reject) => {
            try {
                let counter = 1;
                let promises = [];
                guildData.emojis.forEach(emoji => {
                    let promise = newGuild.emojis.create(emoji.url, emoji.name.replace(/{hotel}/, hotelName)).then(createdEmoji => {
                    });
                    promises.push(promise);
                });

                await Promise.all(promises);

                return resolve();
            } catch (err) {
                return reject(err);
            }
        });
    }
    
    static createBans(guildData, newGuild, translator) {
        return new Promise(async (resolve, reject) => {
            try {
                let counter = 1;
                let promises = [];
                guildData.bans.forEach(ban => {
                    let promise = newGuild.members.ban(ban.userId, { reason: ban.reason }).then(newBan => {
                        let username = newBan.user ? newBan.user.tag : newBan.tag || newBan;
                    });
                    promises.push(promise);
                });

                await Promise.all(promises);

                return resolve(guildData);
            } catch (err) {
                return reject(err);
            }
        });
    }

    static finalize(client, originalGuildId, newGuildId, newGuildAdminRoleId, guildData, translator) {
        return new Promise(async (resolve, reject) => {
            try {
                let newGuild = client.guilds.get(newGuildId);
                let deleteableAdminRole = newGuild.roles.get(newGuildAdminRoleId);
                let textChs = newGuild.channels.filter(c => c.type === 'text');
                let outText = translator.disp('messageGuildCopyFinished', [deleteableAdminRole.name]);

                let invites = [];
                let members = new Discord.Collection();
                if (client.guilds.has(originalGuildId)) {
                    let origGuild = client.guilds.get(originalGuildId);
                    members = await origGuild.members.fetch();
                }
                /*
                if (members.size > 0) {
                    let bots = members.filter(m => m.user.bot);
                    invites = bots.map(b => `<https://discordapp.com/oauth2/authorize?&client_id=${b.user.id}&scope=bot>`);
                }*/

                if (textChs.size > 0) {
                    await textChs.first().send(`@everyone ${outText}`, { split: true });
                }

                return resolve();
            } catch (err) {
                return reject(err);
            }
        });
    }
}

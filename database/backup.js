const { Schema, model } = require('mongoose');
const Backup = new Schema({
    id: {
        type: String,
        required: true
    },
    canais: {
        type: Backup,

    }
})
module.exports = model('Backups', Backup);


const Canal = new Schema({
    id: {
        type: String,
        required: true
    },
    type: {
        type: ['text','category','voice'],
        required: true,
        default: 'text'
    },
    position: {
        type: Number,
        default: 0
    },
    name: {
        type: Number,
        default: 0,
        required: true
    },
    parentID: {
        type: Number,
        default: 0,
        required: true
    },
    permissionOverwrites: {
        type: Number,
        default: 0,
        required: true
    },
    bitrate: {
        type: Number,
        default: 0,
        required: true
    },
    userLimit: {
        type: Number,
        default: 0,
        required: true
    },
    nsfw: {
        type: Boolean,
        default: false,
        required: true
    },
    position: {
        type: Number,
        default: 0,
        required: true
    },
    rateLimitPerUser: {
        type: Number,
        default: 0,
        required: true
    },
    topic: {
        type: String,
        default: '',
        required: true
    }
})
const { Schema, model } = require('mongoose');
const { nome } = require('../config.js');
const Ban = new Schema({
    id: {
        type: String,
        required: true
    },
    tipo: {
        type: Number,
        default: 0
    },
    motivo: {
        type: String,
        default: 'Motivo não expecificado!'
    },
    banidoPor: {
        type: String,
        default: nome
    },
    tempo: {
        expiravel: {
            type: Boolean,
            default: false
        },
        expiraEm: {
            type: Number,
            default: -1
        }
    }
})
module.exports = model('Bans', Ban);
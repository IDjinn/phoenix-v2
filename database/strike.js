const { Schema, model } = require('mongoose');
const Strike = new Schema({
    id: {
        type: String,
        required: true
    },
    servidor:{
        type: String,
        required: true
    },
    motivo: {
        type: String,
        default: 'Motivo não expecificado!'
    },
    aplicadoPor: {
        type: String,
        default: 'Phoenix'
    },
    expiraEm: {
        type: Number,
        default: -1
    },
    tempo: {
        type: String,
        default: ''
    },
    lastAction: {
        type: String,
        default: undefined
    }
})
module.exports = model('Strikes', Strike);
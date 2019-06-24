const { Schema, model } = require('mongoose');
const User = new Schema({
    id: {
        type: String,
        required: true
    },
    nivel: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    moedas: {
        type: Number,
        default: 0
    },
    reputacao: {
        type: Number,
        default: 0
    },
    tempoOnline: {
        type: Number,
        default: 0
    }
})
module.exports = model('Users',User);
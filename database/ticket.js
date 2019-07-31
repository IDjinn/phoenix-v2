const { Schema, model } = require('mongoose');
const Ticket = new Schema({
    id: {
        type: String,
        required: true
    },
    servidor:{
        type: String,
        default: ''
    },
    usuario:{
        type: String,
        default: ''
    },
    cargo:{
        type: String,
        default: ''
    },
    canal:{
        type: String,
        default: ''
    },
    criadoEm:{
        type: String,
        default: ''
    }
})
module.exports = model('Tickets', Ticket);
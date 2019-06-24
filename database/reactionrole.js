const { Schema, model } = require('mongoose');
const ReactionRole = new Schema({
    role: {
        type: String,
        required: true
    },
    mensagem: {
        type: String,
        required: true
    },
    servidor: {
        type: String,
        required: true
    },
    canal: {
        type: String,
        required: true
    },
    emoji: {
        type: String,
        required: true
    }
})
module.exports = model('ReactionRoles', ReactionRole);
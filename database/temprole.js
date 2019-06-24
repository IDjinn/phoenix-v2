const { Schema, model } = require('mongoose');
const TempRole = new Schema({
    id: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    servidor: {
        type: String,
        required: true
    },
    criadoEm: {
        type: String,
        required: true
    },
    expiraEm: {
        type: String,
        required: true
    }
})
module.exports = model('TempRole', TempRole);
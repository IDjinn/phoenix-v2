const { Schema, model } = require('mongoose');
const Backup = new Schema({
    id: {
        type: String,
        required: true
    },
    json: {
        type: JSON,
        required: true
    },
    atualizacoes:{
        type: JSON,
        default: {}
    }
})
module.exports = model('Backups', Backup);
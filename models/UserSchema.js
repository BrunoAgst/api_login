const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    guid: {
        type: String,
        require
    },
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require:true
    },
    senha: {
        type: String,
        require: true
    },
    data_criacao: {
        type: Date,
        require: true
    },
    data_atualizacao: {
        type: Date,
        require: true
    },
    ultimo_login: {
        type: Date,
        require: true
    },
    telefones: [
        {
            numero: {
                type: String,
                require: true
            },
            ddd: {
                type: String,
                require: true
            }
        }
    ]
})

module.exports = User = mongoose.model('user', UserSchema);


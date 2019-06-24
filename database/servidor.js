const { Schema, model } = require('mongoose');
const Servidores = new Schema({
    id: {
        type: String,
        required: true
    },
    prefixo: {
        type: String,
        default: '>'
    },
    vip: {
        type: Boolean,
        default: false
    },
    niveis: {
        enabled: {
            type: Boolean,
            default: false
        },
        canal: {
            type: String,
            default: ''
        },
        embed: {
            type: JSON,
            default: ''
        }
    },
    punicao: {
        enabled: {
            type: Boolean,
            default: false
        },
        canal: {
            type: String,
            default: ''
        },
        embed: {
            type: JSON,
            default: ''
        }
    },
    anunciar: {
        enabled: {
            type: Boolean,
            default: false
        },
        canal: {
            type: String,
            default: ''
        },
        embed: {
            type: JSON,
            default: ''
        }
    },
    comandos: {
        enabled: {
            type: Boolean,
            default: false
        },
        whitelist: {
            type: Array,
            default: []
        },
        blacklist: {
            type: Array,
            default: []
        },
        embed: {
            type: JSON,
            default: ''
        }
    },
    contador: {
        usuarios: {
            enabled: {
                type: Boolean,
                default: false
            },
            canal: {
                type: String,
                default: ''
            },
            nome: {
                type: String,
                default: ''
            }
        },
        bots: {
            enabled: {
                type: Boolean,
                default: false
            },
            canal: {
                type: String,
                default: ''
            },
            nome: {
                type: String,
                default: ''
            }
        },
        canais: {
            enabled: {
                type: Boolean,
                default: false
            },
            canal: {
                type: String,
                default: ''
            },
            nome: {
                type: String,
                default: ''
            }
        }
    },
    welcome: {
        join: {
            enabled: {
                type: Boolean,
                default: false
            },
            channel: {
                type: String,
                default: ''
            },
            embed: {
                type: JSON,
                default: ''
            }
        },
        leave: {
            enabled: {
                type: Boolean,
                default: false
            },
            channel: {
                type: String,
                default: ''
            },
            embed: {
                type: JSON,
                default: ''
            }
        },
    },
    autorole: {
        enabled: {
            type: Boolean,
            default: false
        },
        roles: {
            type: Array,
            default: []
        },
    },
    cargos: {
        moderador: {
            type: Array,
            default: []
        },
        administrador:{
            type: Array,
            default: []
        },
        convites:{
            type: Array,
            default: []
        },
        links:{
            type: Array,
            default: []
        }
    },
    invites:{
        enabled: {
            type: Boolean,
            default: false
        },
        canal: {
            type: String,
            default: ''
        },
        embed: {
            type: JSON,
            default: ''
        },
    },
    economia: {
        moeda: {
            singular: {
                type: String,
                default: 'real'
            },
            plural: {
                type: String,
                default: 'reais'
            },
            valor: {
                type: Number,
                default: 10
            },
        }
    },
    moderacao:{
        convites: {
            enabled: {
                type: Boolean,
                default: false
            },
            autowarn: {
                type: Boolean,
                default: false
            },
            whitelist: {
                type: Array,
                default: []
            },
            blacklist: {
                type: Array,
                default: []
            }
        },
        links: {
            enabled: {
                type: Boolean,
                default: false
            },
            whitelist: {
                type: Array,
                default: []
            },
            blacklist: {
                type: Array,
                default: []
            }
        },
        globalbans: {
            enabled: {
                type: Boolean,
                default: false
            },
            types: {
                type: Number,
                default: 0
            }
        },
    },
    logger: {
        messageDeleted: {
            enabled: {
                type: Boolean,
                default: false
            },
            channel: {
                type: String,
                default: ''
            },
            embed: {
                type: JSON,
                default: ''
            }
        },
        messageUpdated: {
            enabled: {
                type: Boolean,
                default: false
            },
            channel: {
                type: String,
                default: ''
            },
            embed: {
                type: JSON,
                default: ''
            }
        },
        guildUpdated: {
            enabled: {
                type: Boolean,
                default: false
            },
            channel: {
                type: String,
                default: ''
            },
            embed: {
                type: JSON,
                default: ''
            }
        },
        roleUpdated: {
            enabled: {
                type: Boolean,
                default: false
            },
            channel: {
                type: String,
                default: ''
            },
            embed: {
                type: JSON,
                default: ''
            }
        },
        roleCreated: {
            enabled: {
                type: Boolean,
                default: false
            },
            channel: {
                type: String,
                default: ''
            },
            embed: {
                type: JSON,
                default: ''
            }
        },
        roleDeleted: {
            enabled: {
                type: Boolean,
                default: false
            },
            channel: {
                type: String,
                default: ''
            },
            embed: {
                type: JSON,
                default: ''
            }
        },
        memberUpdated: {
            enabled: {
                type: Boolean,
                default: false
            },
            channel: {
                type: String,
                default: ''
            },
            embed: {
                type: JSON,
                default: ''
            }
        },
        channelCreated: {
            enabled: {
                type: Boolean,
                default: false
            },
            channel: {
                type: String,
                default: ''
            },
            embed: {
                type: JSON,
                default: ''
            }
        },
        channelUpdated: {
            enabled: {
                type: Boolean,
                default: false
            },
            channel: {
                type: String,
                default: ''
            },
            embed: {
                type: JSON,
                default: ''
            }
        },
        channelDeleted: {
            enabled: {
                type: Boolean,
                default: false
            },
            channel: {
                type: String,
                default: ''
            },
            embed: {
                type: JSON,
                default: ''
            }
        },
    }
});

module.exports = model('Servidores', Servidores);
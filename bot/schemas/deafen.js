const mongoose = require("mongoose");

const stringOpt = {
    type: String,
    required: true,
}

const deafSchama = mongoose.Schema({
    deafId: stringOpt,
    deafTag: stringOpt,
    staffId: stringOpt,
    staffTag: stringOpt,
    reason: stringOpt,
    guildId: stringOpt,
    guildName: stringOpt,
    deafDate: {
        type: Date, 
        required: true,
        default: Date.now()
    },
    undeafDate: {
        type: Date,
    }
})

module.exports = mongoose.model('deafs', deafSchama)
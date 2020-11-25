const mongoose = require('mongoose')

const workCooldown = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    claimed: {
        type: Date,
        required: true,
        default: Date.now(),
    }
})

module.exports = mongoose.model('work-cooldown', workCooldown)
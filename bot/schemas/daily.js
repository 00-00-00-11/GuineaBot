const mongoose = require('mongoose')

const dailyCooldown = mongoose.Schema({
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

module.exports = mongoose.model('daily-cooldowns', dailyCooldown)
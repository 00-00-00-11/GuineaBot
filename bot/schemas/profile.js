const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    job: {
        type: String,
        required: true,
        default: "Unemployed"
    },
    bank: {
        type: Number, 
        required: true,
        default: 0,
    },
    wallet: {
        type: Number, 
        required: true,
        default: 0,
    },
    experience: {
        type: Number, 
        required: true,
        default: 0,
    },
    level: { 
        type: Number, 
        required: true,
        default: 0,
    },
    multiplier: {
        type: Number, 
        required: true,
        default: 0,
    },
    inventory: {
        type: [Object],
        required: true,
    }
})

module.exports = mongoose.model('profiles', profileSchema)
const Discord = require("discord.js")
module.exports = {
    name: 'coolkid',
    category: 'fun',
    description: "Welcome to downtown coolsville",
    run: async (message, args, client) => {
        let precent = Math.floor(Math.random() * 100)

        message.reply(`You are ${precent}% cool kid. 😎`)
    }
}
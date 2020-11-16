const Discord = require("discord.js")
module.exports = {
    name: 'gamer',
    category: 'fun',
    description: "Welcome to downtown gamersville",
    run: async (message, args, client, prefix, command) => {
        let precent = Math.floor(Math.random() * 100)

        message.reply(`You are ${precent}% gamer. 🎮`)
    }
}
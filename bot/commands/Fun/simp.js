const Discord = require("discord.js")
module.exports = {
    name: 'simp',
    category: 'fun',
    description: "Welcome to downtown simpsville",
    run: async (message, args, client) => {
        let precent = Math.floor(Math.random() * 100)

        message.reply(`You are ${precent}% simp. 😳`)
    }
}
const Discord = require("discord.js")
module.exports = {
    name: 'simp',
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND}`",
    description: "Welcome to downtown simpsville",
    run: async (message, args, client, prefix, command) => {
        //Get a random precentage
        let precent = Math.floor(Math.random() * 100)

        //uh oh, have you been watching pokimaine lately?
        message.reply(`You are ${precent}% simp. 😳`)
    }
}
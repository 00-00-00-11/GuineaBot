const Discord = require("discord.js")
module.exports = {
    name: 'beep',
    category: 'fun',
    description: 'Imitate a robot :)',
    run: async (message, args, client, prefix, command) => {
        message.channel.send('Boop 🤖')
    }
}
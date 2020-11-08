const Discord = require("discord.js")
module.exports= {
    name: 'beep',
    category: 'fun',
    description: 'Beep Boop',
    run: async(message, args, client) => {
        message.channel.send('Boop 🤖')
    }
}
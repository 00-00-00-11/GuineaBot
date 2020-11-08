const Discord = require("discord.js")
module.exports = {
    name: 'foo',
    category: 'fun',
    description: 'idk lol',
    run: async (message, args, client) => {
        message.channel.send('Bar()')
    }
}
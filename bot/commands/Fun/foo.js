const Discord = require("discord.js")
module.exports = {
    name: 'foo',
    category: 'fun',
    description: 'idk lol',
    run: async (message, args, client, prefix, command) => {
        message.channel.send('Bar()')
    }
}
const Discord = require("discord.js")
module.exports= {
    name: 'foo',
    category: 'fun',
    description: 'Foo Bar.',
    run: async(message, args, client) => {
        message.channel.send('Bar()')
    }
}
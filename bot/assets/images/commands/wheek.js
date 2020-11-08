const Discord = require("discord.js")
module.exports= {
    name: 'wheek',
    category: 'fun',
    description: 'NEED FOOD',
    run: async(message, args, client) => {
        message.channel.send('Wheeeeeeeeeek! 🐹')
    }
}
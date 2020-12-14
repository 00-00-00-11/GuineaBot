const mongo = require('../../mongo')
const schema = require('../../schemas/pruning')

module.exports = {
    name: "pruning",
    minArgs: 0,
    maxArgs: 0,
    globalCooldown: "30m",
    description: "Prevents spam when it comes to playing playlists",
    category: "Music",
    requiredPermissions: ['ADMINISTRATOR'],
    run: async (message, args, text, client, prefix, instance) => {
        await mongo().then(async (mongoose) => {
            try {
                let data = await schema.findOne({
                    guildId: message.guild.id
                })

                if (!data) {
                    let newData = await schema.create({
                        guildId: message.guild.id,
                        pruning: true
                    })

                    data = newData
                }

                let updatedData = await schema.findOneAndUpdate({
                    guildId: message.guild.id,
                }, {
                    guildId: message.guild.id,
                    pruning: !data.pruning
                }, {
                    upsert: true,
                })

                let newDataAfterUpdate = await schema.findOne({
                    guildId: message.guild.id
                })

                return message.channel.send(`Message pruning ${newDataAfterUpdate.pruning ? "**enabled**" : "**disabled**"}`)
            } catch (error) {
                message.channel.send(`An error occurred: ${error.message}`)
                console.log(error)
            }
        })
    }
}
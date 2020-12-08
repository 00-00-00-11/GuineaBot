const mongo = require('../../mongo')
const warnSchema = require("../../schemas/warn")
const Discord = require("discord.js")

module.exports = {
    name: "removewarns",
    aliases: ["-warns"],
    requiredPermissions: [ "KICK_MEMBERS"],
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<mention>",
    description: "Remove all warnings from a member",
    category: "Moderation",
    run: async (message, args, text, client, prefix, instance) => {
        let modlog = message.guild.channels.cache.find(channel => {
            return channel.name === "g-modlog"
        })

        if (!modlog) return message.channel.send(`Could not find channel **g-modlog**, please install the required values using \`${prefix}setup\`.`)

        let target = message.mentions.users.first()
        if (!target) return message.reply('Please specify someone to remove their warnings for.')

        const guildId = message.guild.id
        const userId = target.id

        await mongo().then(async (mongoose) => {
            try {
                await warnSchema.findOneAndDelete({
                    warnId: userId,
                    guildId: guildId,
                })
            } catch (e) {
                console.log(e)
                message.channel.send(`An error occurred: ${e.message}`)
            }

            message.channel.send(`Removed all warnings for ${target}`)
        })

        const logEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Warnings cleared for user')
            .setAuthor('Modlog')
            .addFields({
                name: 'Moderator: ',
                value: `${message.author} (${message.author.id})`
            }, {
                name: 'Moderated on: ',
                value: `${target} (${target.id})`
            }, {
                name: 'Date: ',
                value: `${message.createdAt.toLocaleString()}`
            })
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')
        modlog.send(logEmbed)
    }
}
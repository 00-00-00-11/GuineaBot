const mongo = require('../../mongo')
const warnSchema = require("../../schemas/warn-schema")
const Discord = require("discord.js")

module.exports = {
    name: "removewarn",
    aliases: [ "-warn"],
    category: "moderation",
    description: "Remove a warning to a member for a specific reason",
    run: async (message, args, client, prefix, command) => {
        let modlog = message.guild.channels.cache.find(channel => channel.name === "g-modlog")

        if (!modlog) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Removewarn unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`It looks like \`setup\` command has not been performed yet. Please contact an administrator`)
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(modlogEmbed)
            return
        }

        if (!message.member.hasPermission("KICK_MEMBERS", explicit = true)) {
            const warnpermEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Removewarn unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("You don't have the correct permissions.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(warnpermEmbed)
            return
        }

        let target = message.mentions.users.first()
        if (!target) {
            message.reply('Please specify someone to remove their warnings for.')
            return
        }

        const guildId = message.guild.id
        const userId = target.id

        const warning = {
            author: message.member.user.tag,
            timestamp: new Date().getTime(),
        }

        await mongo().then(async (mongoose) => {
            try {
                await warnSchema.findOneAndRemove({
                    guildId,
                    userId
                }, {
                    guildId,
                    userId,
                    $delete: {
                        warnings: warning,
                    }
                })
            } catch (e) {
                console.log(e)
            }

            message.channel.send(`Removed all warnings for ${target}`)
        })

        const logEmbed = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setTitle('Removewarn command executed')
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
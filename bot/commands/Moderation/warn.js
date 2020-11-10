const mongo = require('../../mongo')
const warnSchema = require("../../schemas/warn-schema")
const Discord = require("discord.js")

module.exports = {
    name: "warn",
    category: "moderation",
    description: "Give a warning to a member for a specific reason",
    run: async (message, args) => {
        let modlog = message.guild.channels.cache.find(channel => channel.name === "g-modlog")

        if (!modlog) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Warn unsuccessful')
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
                .setTitle('Warn unsuccessful')
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
            message.reply('Please specify someone to warn.')
            return
        }

        const guildId = message.guild.id
        const userId = target.id
        let reason = args.slice(1).join(" ")

        if (!reason) {
            reason = "No reason given"
        }

        const warning = {
            author: message.member.user.tag,
            timestamp: new Date().getTime(),
            reason,
        }

        await mongo().then(async (mongoose) => {
            try {
                await warnSchema.findOneAndUpdate({
                    guildId,
                    userId,
                }, {
                    guildId,
                    userId,
                    $push: {
                        warnings: warning,
                    },
                }, {
                    upsert: true,
                })
            } finally {
                mongoose.connection.close()
            }
        })

        const embed = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .addFields({
                name: "Warned member: ",
                value: `${target}`
            }, {
                name: "Reason: ",
                value: `${warning.reason}`
            })
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuinneaBot!')
        
        message.channel.send(embed)

        const logEmbed = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setTitle('Warn command executed')
            .setAuthor('Modlog')
            .addFields({
                name: 'Moderator: ',
                value: `${message.author} (${message.author.id})`
            }, {
                name: 'Moderated on: ',
                value: `${target} (${target.id})`
            }, {
                name: 'Reason: ',
                value: `${warning.reason}`
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
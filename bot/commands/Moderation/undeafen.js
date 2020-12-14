const Discord = require('discord.js')
const mongo = require('../../mongo')
const deafSchema = require('../../schemas/deafen')

module.exports = {
    name: "undeafen",
    aliases: ['undeaf'],
    requiredPermissions: [ "DEAFEN_MEMBERS" ],
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<mention> [reason]",
    description: "Allow a user to hear others in a voice channel",
    category: "Moderation",
    run: async (message, args, text, client, prefix, instance) => {
        let modlog = message.guild.channels.cache.find(channel => {
            return channel.name && channel.name.includes("g-modlog")
        })

        let target = message.mentions.members.first()
        let targetId = target.id
        let targetTag = `${target.user.username}#${target.user.discriminator}`

        if (targetId === client.user.id) return message.reply("You cannot undeafen me")
        if (targetId === message.author.id) return message.reply("You cannot undeafen yourself.")
        if (target.user.bot) return message.reply("Target is a bot, failed to undeafen.")

        let staff = message.member
        let staffId = staff.id
        let staffTag = `${staff.user.username}#${staff.user.discriminator}`

        let reason = args.slice(1).join(" ")

        if (!target.voice.channel) return message.reply(`${targetTag} is not connected to a voice channel.`)
        if (!target.voice.serverDeaf) return message.reply(`${targetTag} is already not server deafened.`)

        await mongo().then(async (mongoose) => {
            try {
                let data = await deafSchema.findOneAndDelete({
                    deafId: targetId,
                    guildId: message.guild.id,
                })

                const DMEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`You have been deafened in ${data.guildName}`)
                    .setAuthor("Automated Guineabot message", message.client.user.avatarURL())
                    .setTimestamp()
                    .setFooter("Shoulda followed the rules... :/")
                    .addFields({
                        name: "Moderator",
                        value: staffTag
                    }, {
                        name: "Reason",
                        value: reason
                    }, {
                        name: "Date",
                        value: data.deafDate.toLocaleString()
                    })

                target
                    .createDM()
                    .then((DM) => {
                        DM.send(DMEmbed)
                            .then(() => {
                                target.voice.setDeaf(false, reason)

                                const success = new Discord.MessageEmbed()
                                    .setColor("RANDOM")
                                    .setDescription(`Successfully undeafened **${targetTag}** for **${reason}**`)
                                    .setFooter("Thank you for using GuineaBot!")
                                    .setTimestamp()
                                message.channel.send(success)

                                const modlogEmbed = new Discord.MessageEmbed()
                                    .setColor("RANDOM")
                                    .setTitle("Member undeafened")
                                    .setAuthor("Guineabot Modlog", message.client.user.avatarURL())
                                    .setTimestamp()
                                    .setFooter("Thank you for using GuineaBot!")
                                    .addFields({
                                        name: "Deafened member",
                                        value: `${targetTag} (${targetId})`
                                    }, {
                                        name: "Responsible moderator",
                                        value: `${staffTag} (${staffId})`
                                    }, {
                                        name: "Reason",
                                        value: `${reason}`
                                    }, {
                                        name: "Date",
                                        value: `${data.deafDate.toLocaleString()}`
                                    })
                                modlog.send(modlogEmbed)
                            })
                    })
            } catch (err) {
                console.log(err)
                message.channel.send(`An error occurred: \`${err.message}\``)
            }
        })
    }
}
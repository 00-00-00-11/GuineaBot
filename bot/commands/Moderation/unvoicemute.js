const Discord = require('discord.js')
const muteSchema = require('../../schemas/voicemute')
const mongo = require('../../mongo')

module.exports = {
    name: 'unvoicemute',
    aliases: ["uvm"],
    requiredPermissions: [ "MUTE_MEMBERS" ],
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<mention> [reason]",
    description: 'Alow user to talk in voice channels',
    category: "Moderation",
    run: async (message, args, text, client, prefix, instance) => {
        let modlog = message.guild.channels.cache.find(channel => {
            return channel.name === "g-modlog"
        })

        let target = message.mentions.members.first()
        let targetId = target.id
        let targetTag = `${target.user.username}#${target.user.discriminator}`

        if (!target) return message.channel.send("You need to mention a valid user.")
        if (targetId === client.user.id) return message.reply("You cannot unmute me using me.")
        if (targetId === message.author.id) return message.reply("You cannot unmute yourself.")
            
        let staff = message.member
        let staffId = staff.id
        let staffTag = `${staff.user.username}#${staff.user.discriminator}`

        let reason = args.slice(1).join(" ")

        if (!modlog) return message.channel.send(`Could not find channel **g-modlog**, please install the required values using \`${prefix}setup\`.`)
        if (!reason) reason = "No reason provided."
        if (staff.roles.highest.position < target.roles.highest.position) return message.reply(`You cannot mute ${targetTag} due to role hierarchy.`)

        if (!target.voice.channel) return message.reply(`${targetTag} is not connected to a voice channel.`)
        if (!target.voice.serverMute) return message.reply(`${targetTag} is already not server muted.`)

        await mongo().then(async (mongoose) => {
            try {
                let data = await muteSchema.findOneAndDelete({
                    muteId: targetId,
                    guildId: message.guild.id,
                })

                const DMEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`You have been un voice muted in ${data.guildName}`)
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
                        value: data.muteDate.toLocaleString()
                    })

                target
                    .createDM()
                    .then((DM) => {
                        DM.send(DMEmbed)
                            .then(() => {
                                target.voice.setMute(false, reason)

                                const success = new Discord.MessageEmbed()
                                    .setColor("RANDOM")
                                    .setDescription(`Successfully un voice muted **${data.muteTag}** for **${reason}**`)
                                    .setFooter("Thank you for using GuineaBot!")
                                    .setTimestamp()
                                message.channel.send(success)

                                const modlogEmbed = new Discord.MessageEmbed()
                                    .setColor("RANDOM")
                                    .setTitle("Member un voice muted")
                                    .setAuthor("Guineabot Modlog", message.client.user.avatarURL())
                                    .setTimestamp()
                                    .setFooter("Thank you for using GuineaBot!")
                                    .addFields({
                                        name: "Unmuted member",
                                        value: `${targetTag} (${targetId})`
                                    }, {
                                        name: "Responsible moderator",
                                        value: `${staffTag} (${staffId})`
                                    }, {
                                        name: "Reason",
                                        value: `${reason}`
                                    }, {
                                        name: "Date",
                                        value: `${data.muteDate.toLocaleString()}`
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
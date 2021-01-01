const Discord = require('discord.js')

module.exports = {
    name: "kick",
    requiredPermissions: ['KICK_MEMBERS'],
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<mention> [reason]",
    description: "Kick a user from the Discord server",
    category: "Moderation",
    run: async ({ message, args, text, client, prefix, instance }) => {
        let modlog = message.guild.channels.cache.find(channel => {
            return channel.name && channel.name.includes("g-modlog")
        })

        const target = message.mentions.members.first()

        if (!target) return message.channel.send("You need to mention a valid user.")

        const targetId = target.id
        const targetTag = `${target.user.username}#${target.user.discriminator}`

        if (targetId === client.user.id) return message.reply("You cannot kick me using me.")
        if (targetId === message.author.id) return message.reply("You cannot kick yourself.")
        if (target.user.bot) return message.reply("Target is a bot, failed to kick.")

        const staff = message.member
        const staffId = staff.id
        const staffTag = `${staff.user.username}#${staff.user.discriminator}`

        let reason = args.slice(1).join(" ")
        const date = new Date()
        date.setDate(date.getDate())

        if (!modlog) return message.channel.send(`Could not find channel **g-modlog**, please install the required values using \`${prefix}setup\`.`)
        if (!reason) reason = "No reason provided."
        if (staff.roles.highest.position < target.roles.highest.position) return message.reply(`You cannot kick ${targetTag} due to role hierarchy.`)

        try {
            const DMEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`You have been kicked from ${message.guild.name}`)
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
                    value: date.toLocaleString()
                })

            target
                .createDM()
                .then((DM) => {
                    DM.send(DMEmbed)
                        .then(() => {
                            message.guild.member(target).kick(reason)
                            
                            const success = new Discord.MessageEmbed()
                                .setColor("RANDOM")
                                .setDescription(`Successfully kicked **${targetTag}** for **${reason}**`)
                                .setFooter("Thank you for using GuineaBot!")
                                .setTimestamp()
                            message.channel.send(success)

                            const modlogEmbed = new Discord.MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle("Member kicked")
                                .setAuthor("Guineabot Modlog", message.client.user.avatarURL())
                                .setTimestamp()
                                .setFooter("Thank you for using GuineaBot!")
                                .addFields({
                                    name: "Kicked member",
                                    value: `${targetTag} (${targetId})`
                                }, {
                                    name: "Responsible moderator",
                                    value: `${staffTag} (${staffId})`
                                }, {
                                    name: "Reason",
                                    value: `${reason}`
                                }, {
                                    name: "Date",
                                    value: `${date.toLocaleString()}`
                                })
                            modlog.send(modlogEmbed)
                        })
                })
        } catch (err) {
            console.log(err)
            message.channel.send(`An error occurred: \`${err.message}\``)
        }
    }
}
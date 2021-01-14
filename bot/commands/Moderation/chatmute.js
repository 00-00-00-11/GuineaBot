const Discord = require('discord.js')
const mongo = require('../../mongo')
const muteSchema = require('../../schemas/chatmute')

module.exports = {
    name: "chatmute",
    aliases: ["cm"],
    requiredPermissions: ["MANAGE_ROLES"],
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<mention> [reason]",
    description: "Prevent user from chatting in channels",
    category: "Moderation",
    run: async ({
        message,
        args,
        text,
        client,
        prefix,
        instance
    }) => {
        let modlog = message.guild.channels.cache.find(channel => {
            return channel.name && channel.name.includes("g-modlog")
        })
        let role = message.guild.roles.cache.find(role => {
            return role.name === "gmuted"
        })

        let target = message.mentions.members.first()
        let targetId = target.id
        let targetTag = `${target.user.username}#${target.user.discriminator}`

        if (targetId === client.user.id) return message.reply("You cannot mute me using me.")
        if (targetId === message.author.id) return message.reply("You cannot mute yourself.")
        if (target.user.bot) return message.reply("Target is a bot, failed to mute.")

        let staff = message.member
        let staffId = staff.id
        let staffTag = `${staff.user.username}#${staff.user.discriminator}`

        let reason = args.slice(1).join(" ")

        if (!modlog) return message.channel.send(`Could not find channel **g-modlog**, please install the required values using \`${prefix}setup\`.`)
        if (!role) return message.channel.send(`Could not find role **gmuted**, please install the required values using \`${prefix}setup\`.`)
        if (target.roles.cache.has(role.id)) return message.channel.send(`Target ${targetTag} already has role **gmuted** assigned.`)
        if (!reason) reason = "No reason provided."
        if (staff.roles.highest.position < target.roles.highest.position) return message.reply(`You cannot mute ${targetTag} due to role hierarchy.`)

        await mongo().then(async (mongoose) => {
            try {
                let data = await muteSchema.create({
                    muteId: targetId,
                    muteTag: targetTag,
                    staffId: staffId,
                    staffTag: staffTag,
                    reason: reason,
                    guildId: message.guild.id,
                    guildName: message.guild.name,
                    muteDate: Date.now()
                })

                target.roles.add(role)

                const success = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`Successfully muted **${data.muteTag}** from chatting for **${data.reason}**`)
                    .setFooter("Thank you for using GuineaBot!")
                    .setTimestamp()
                message.channel.send(success)
            } catch (err) {
                console.log(err)
                message.channel.send(`An error occurred: \`${err.message}\``)
            }
        })
    }
}
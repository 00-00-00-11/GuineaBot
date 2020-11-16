const discordXP = require('discord-xp')
const Discord = require("discord.js")
module.exports = {
    name: 'removexp',
    category: 'leveling',
    description: 'Remove XP from a specific guild member',
    run: async (message, args, client, prefix, command) => {
        if (!message.member.hasPermission("ADMINISTRATOR", explicit = true)) {
            const permEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('XP remove unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("You don't have the correct permissions.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(permEmbed)
            return
        }

        let target = message.mentions.members.first()

        if (target) {
            if (!args[1]) return message.channel.send("How much XP do I remove?")
            let amountToremove = parseInt(args[1])
            if (isNaN(amountToremove)) return message.channel.send("Specify a **number** please.")

            discordXP.subtractXp(target.id, message.guild.id, amountToremove)
            setTimeout(async () => {
                let XPuser = await discordXP.fetch(target.id, message.guild.id)

                if (!XPuser) return message.channel.send(`Seems like ${target} has less XP than the amount you are subtracting, or they have no XP.`)

                message.channel.send(`${message.author} has taken **${amountToremove}** XP away from ${target}, they now have **${XPuser.xp}** XP.`)
            }, 1000)
        } else if (!target) {
            if (!args[0]) return message.channel.send("How much XP do I remove?")
            let amountToremove = parseInt(args[0])
            if (isNaN(amountToremove)) return message.channel.send("Specify a **number** please.")

            discordXP.subtractXp(message.author.id, message.guild.id, amountToremove)
            setTimeout(async () => {
                let XPuser = await discordXP.fetch(message.author.id, message.guild.id)

                message.reply(`I have taken **${amountToremove}** XP from you, you now have **${XPuser.xp}** XP.`)
            }, 1000)
        }
    }
}
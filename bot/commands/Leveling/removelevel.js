const discordXP = require('discord-xp')
const Discord = require("discord.js")
module.exports = {
    name: 'removelevel',
    category: 'leveling',
    description: 'Remove levels from a specific guild member',
    run: async (message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR", explicit = true)) {
            const permEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Level remove unsuccessful')
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
            if (!args[1]) return message.channel.send("How many levels do I remove?")
            let amountToremove = parseInt(args[1])
            if (isNaN(amountToremove)) return message.channel.send("Specify a **number** please.")

            discordXP.subtractLevel(target.id, message.guild.id, amountToremove)
            setTimeout(async () => {
                let XPuser = await discordXP.fetch(target.id, message.guild.id)

                if (!XPuser) return message.channel.send(`Seems like ${target} has less amount of levels than the amount you are subtracting, or they have no level.`)

                message.channel.send(`${message.author} has taken **${amountToremove}** levels away from ${target}, they are now at level **${XPuser.level}**.`)
            }, 1000)
        } else if (!target) {
            if (!args[0]) return message.channel.send("How many levels do I remove?")
            let amountToremove = parseInt(args[0])
            if (isNaN(amountToremove)) return message.channel.send("Specify a **number** please.")

            discordXP.subtractLevel(message.author.id, message.guild.id, amountToremove)
            setTimeout(async () => {
                let XPuser = await discordXP.fetch(message.author.id, message.guild.id)

                message.reply(`I have taken **${amountToremove}** levels from you, you are now at level **${XPuser.level}**.`)
            }, 1000)
        }
    }
}
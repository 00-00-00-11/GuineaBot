const discordXP = require('discord-xp')
const Discord = require("discord.js")
module.exports= {
    name: 'setxp',
    category: 'leveling',
    description: "Set a guild member's XP",
    run: async(message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR", explicit = true)) {
            const permEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('XP set unsuccessful')
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
            if (!args[1]) return message.channel.send("To what XP amount do I set?")
            let amountToAdd = parseInt(args[1])
            if (isNaN(amountToAdd)) return message.channel.send("Specify a **number** please.")

            discordXP.setXp(target.id, message.guild.id, amountToAdd)
            setTimeout(async() => {
                let XPuser = await discordXP.fetch(target.id, message.guild.id)

                message.channel.send(`${message.author} has set ${target}'s XP to **${amountToAdd}**.`)
            }, 1000)
        } else if (!target) {
            if (!args[0]) return message.channel.send("To what XP amount do I set?")
            let amountToAdd = parseInt(args[0])
            if (isNaN(amountToAdd)) return message.channel.send("Specify a **number** please.")

            discordXP.setXp(message.author.id, message.guild.id, amountToAdd)
            setTimeout(async() => {
                let XPuser = await discordXP.fetch(message.author.id, message.guild.id)

                message.reply(`I have set your XP to **${amountToAdd}**.`)
            }, 1000)
        }
    }
}
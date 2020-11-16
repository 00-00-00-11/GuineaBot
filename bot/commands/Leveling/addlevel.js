const discordXP = require('discord-xp')
const Discord = require("discord.js")
module.exports = {
    name: 'addlevel',
    category: 'leveling',
    description: 'Add levels to a specific member in a guild',
    run: async (message, args, client, prefix, command) => {
        if (!message.member.hasPermission("ADMINISTRATOR", explicit = true)) {
            const permEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Level add unsuccessful')
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
            if (!args[1]) return message.channel.send("How many levels do I add?")
            let amountToAdd = parseInt(args[1])
            if (isNaN(amountToAdd)) return message.channel.send("Specify a **number** please.")

            discordXP.appendLevel(target.id, message.guild.id, amountToAdd)
            setTimeout(async () => {
                let XPuser = await discordXP.fetch(target.id, message.guild.id)

                message.channel.send(`${message.author} has given **${amountToAdd}** levels to ${target}, they are now at level **${XPuser.level}**.`)
            }, 1000)
        } else if (!target) {
            if (!args[0]) return message.channel.send("How many levels do I add?")
            let amountToAdd = parseInt(args[0])
            if (isNaN(amountToAdd)) return message.channel.send("Specify a **number** please.")

            discordXP.appendLevel(message.author.id, message.guild.id, amountToAdd)
            setTimeout(async () => {
                let XPuser = await discordXP.fetch(message.author.id, message.guild.id)

                message.reply(`I have given you **${amountToAdd}** levels, you are now at level **${XPuser.level}**.`)
            }, 1000)
        }
    }
}
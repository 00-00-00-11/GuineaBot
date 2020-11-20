const discordXP = require('discord-xp')
const Discord = require("discord.js")
module.exports= {
    name: 'setxp',
    minArgs: 1,
    maxArgs: 2,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <mention> <number>` or `{PREFIX}{COMMAND} <number>`",
    description: "setxp command",
    run: async(message, args, client, prefix, command) => {
        let target = message.mentions.members.first()

        if (target) {
            let amountToAdd = parseInt(args[1])
            if (isNaN(amountToAdd)) return message.channel.send("Specify a **number** please.")

            discordXP.setXp(target.id, message.guild.id, amountToAdd)
            setTimeout(async() => {
                let XPuser = await discordXP.fetch(target.id, message.guild.id)

                message.channel.send(`${message.author} has set ${target}'s XP to **${amountToAdd}**.`)
            }, 1000)
        } else if (!target) {
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
const discordXP = require('discord-xp')
const Discord = require("discord.js")
module.exports = {
    name: 'removelevel',
    aliases: ["-lvl"],
    minArgs: 0,
    maxArgs: 1,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <mention> <number>` or `{PREFIX}{COMMAND} <number>`",
    description: "remove levels",
    run: async (message, args, client, prefix, command) => {
        let target = message.mentions.members.first()

        if (target) {
            let amountToremove = parseInt(args[1])
            if (isNaN(amountToremove)) return message.channel.send("Specify a **number** please.")

            discordXP.subtractLevel(target.id, message.guild.id, amountToremove)
            setTimeout(async () => {
                let XPuser = await discordXP.fetch(target.id, message.guild.id)

                if (!XPuser) return message.channel.send(`Seems like ${target} has less amount of levels than the amount you are subtracting, or they have no level.`)

                message.channel.send(`${message.author} has taken **${amountToremove}** levels away from ${target}, they are now at level **${XPuser.level}**.`)
            }, 1000)
        } else if (!target) {
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
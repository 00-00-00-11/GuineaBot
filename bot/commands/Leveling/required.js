const discordXP = require('discord-xp')
module.exports = {
    name: 'required',
    aliases: ["req"],
    minArgs: 1,
    maxArgs: 1,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <number>`",
    description: "req command",
    run: async (message, args, client, prefix, command) => {
        let level = parseInt(args[0])
        if (isNaN(level)) return message.channel.send("Specify a **number** please.")

        let requiredXP = discordXP.xpFor(level)

        message.channel.send(`The required XP to reach level ${level} is **${requiredXP}**.`)
    }
}
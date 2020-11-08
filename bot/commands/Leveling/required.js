const discordXP = require('discord-xp')
module.exports = {
    name: 'required',
    category: 'leveling',
    description: 'Shows much much XP you need to reach a specific level',
    run: async (message, args) => {
        if (!args[0]) return message.channel.send("What level do you want me to display the required XP for?")
        let level = parseInt(args[0])
        if (isNaN(level)) return message.channel.send("Specify a **number** please.")

        let requiredXP = discordXP.xpFor(level)

        message.channel.send(`The required XP to reach level ${level} is **${requiredXP}**.`)
    }
}
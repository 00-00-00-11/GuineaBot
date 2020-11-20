const discordXP = require('discord-xp')
module.exports = {
    name: 'rank',
    aliases: ["level"],
    minArgs: 0,
    maxArgs: 1,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <mention>` or `{PREFIX}{COMMAND}`",
    description: "rank command",
    run: async (message, args, client, prefix, command) => {
        const target = message.mentions.users.first() || message.author
        let XPuser = await discordXP.fetch(target.id, message.guild.id)

        if (!XPuser) return message.channel.send(`Seems like ${target.tag} does not have any XP.`)

        let requiredXP = discordXP.xpFor(XPuser.level + 1)
        let XPleft = requiredXP - XPuser.xp
        message.channel.send(`${target.tag} is currently level **${XPuser.level}** with **${XPuser.xp}** XP, they need **${XPleft}** more XP to reach level **${XPuser.level + 1}**.`)
    }
}
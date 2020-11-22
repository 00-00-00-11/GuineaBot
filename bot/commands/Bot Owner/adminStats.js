const Discord = require('discord.js')

module.exports = {
    name: 'adminstats',
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND}`",
    description: "dangerous stats",
    run: async (message, args, text, client, prefix, instance) => {
        //Check if you are not me (Cy1der)
        if (message.author.id !== "423222193032396801") return message.reply("You are not the owner of the bot, also known as ${Cy1der}#0001.")

        const embed = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setTitle("Administrative bot stats")
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')

        let default_prefix = instance._defaultPrefix
        let commandsDir = instance._commandsDir
        let listenersDir = instance._featureDir
        let mongo = instance._mongo
        let defaultSyntaxError = instance._syntaxError
        let token = client.token
        let user = client.user
        let voice = JSON.stringify(client.voice, null, 2)
        let ws = JSON.stringify(client.ws, null, 2)

        if (!commandsDir) commandsDir = "ENCRYPTED"
        if (!listenersDir) listenersDir = "ENCRYPTED"

        embed.addFields(
            { name: "Default Prefix", value: `${default_prefix}` },
            { name: "Commands Directory", value: `${commandsDir}` },
            { name: "Listeners Directory", value: `${listenersDir}` },
            { name: "MongoDB Database Connection", value: "Logged in console, too dangerous to show" },
            { name: "Default Syntax Error", value: `${defaultSyntaxError}` },
            { name: "Bot Login Token", value: "Logged in console, too dangerous to show" },
            { name: "Logged in Bot", value: `${user}`},
            { name: "Client voice manager", value: `\`${voice}\``},
            { name: "Client Websocket", value: `\`${ws}\``}
        )

        console.log(token)
        console.log(mongo)
        message.channel.send(embed)
    }
}
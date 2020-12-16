const Discord = require('discord.js')
const bin = require("sourcebin_js")

module.exports = {
    name: 'adminstats',
    minArgs: 0,
    maxArgs: 0,
    description: "Display statistics not avaiable for the public",
    category: "Bot Owner",
    ownerOnly: true,
    run: async (message, args, text, client, prefix, instance) => {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(instance.messageHandler.get(message.guild, "ADMIN_STATS_TITLE"))
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setTimestamp()
            .setFooter(instance.messageHandler.get(message.guild, "THANKS"))

        let default_prefix = instance._defaultPrefix
        let commandsDir = instance._commandsDir
        let listenersDir = instance._featureDir
        let mongo = instance._mongo
        let token = client.token
        let user = client.user
        let voice = JSON.stringify(client.voice, null, 2)
        let ws = JSON.stringify(client.ws, null, 2)

        let vmURL = await bin.create([{
            name: "GuineaBot/Cy1der",
            content: voice,
            languageId: "JSON"
        }], {
            title: "Guineabot voice manager",
            description: "Adminstats command executed"
        }).then(bin => {
            return bin.url
        })

        let wsURL = await bin.create([{
            name: "GuineaBot/Cy1der",
            content: ws,
            languageId: "JSON"
        }], {
            title: "Guineabot websocket",
            description: "Adminstats command executed"
        }).then(bin => {
            return bin.url
        })

        if (!commandsDir) commandsDir = instance.messageHandler.get(message.guild, "ENCRYPTED")
        if (!listenersDir) listenersDir = instance.messageHandler.get(message.guild, "ENCRYPTED")

        embed.addFields({
            name: instance.messageHandler.get(message.guild, "DEFAULT_PREFIX"),
            value: `${default_prefix}`
        }, {
            name: instance.messageHandler.get(message.guild, "CMD_DIR"),
            value: `${commandsDir}`
        }, {
            name: instance.messageHandler.get(message.guild, "LIS_DIR"),
            value: `${listenersDir}`
        }, {
            name: instance.messageHandler.get(message.guild, "MDB"),
            value: `[${instance.messageHandler.get(message.guild, "HERE")}](https://www.theraleighregister.com/guineabotsensitivedata.html)`
        }, {
            name: instance.messageHandler.get(message.guild, "BOT_LOGIN_TOKEN"),
            value: `[${instance.messageHandler.get(message.guild, "HERE")}](https://www.theraleighregister.com/guineabotsensitivedata.html)`
        }, {
            name: instance.messageHandler.get(message.guild, "CLIENT_VM"),
            value: `[sourceb.in](${vmURL})`
        }, {
            name: instance.messageHandler.get(message.guild, "CLIENT_WS"),
            value: `[sourceb.in](${wsURL})`
        }, {
            name: instance.messageHandler.get(message.guild, "LOGGED_IN"),
            value: `${user}`
        },)

        console.log(token)
        console.log(mongo)
        message.channel.send(embed)
    }
}
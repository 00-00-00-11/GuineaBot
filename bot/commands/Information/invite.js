const Discord = require("discord.js")
module.exports = {
    name: "invite",
    minArgs: 0,
    maxArgs: 0,
    description: "Invite link to add the bot to a server",
    category: "Information",
    run: async ({ message, args, text, client, prefix, instance }) => {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("[Guineabot OAUTH2 Invite Link]")
            .setURL("https://discord.com/oauth2/authorize?client_id=727288620221857843&scope=bot&permissions=2146958847")
            .setDescription("[Guineabot Support Server](https://discord.gg/6KpZhR3SRP)")
            .setTimestamp()
        message.channel.send(embed)
    }
}
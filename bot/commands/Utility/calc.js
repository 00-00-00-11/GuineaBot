const Discord = require("discord.js")
const math = require("mathjs")
module.exports = {
    name: 'calc',
    minArgs: 1,
    maxArgs: -1,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <equation>`",
    description: "dc",
    run: async (message, args, text, client, prefix, instance) => {
        if (!args[0]) return message.channel.send("Input a calculaton")

        let resp

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send("Sorry, invalid calculation.")
        }

        const embed = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setTitle('Calculator')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')
            .addField("Input: ", `\`\`\`${args.join(" ")}\`\`\``)
            .addField("Output", `\`\`\`${resp}\`\`\``)

        message.channel.send(embed)
    }
}
const Discord = require("discord.js")
const urban = require("relevant-urban")
module.exports = {
    name: 'urban',
    minArgs: 1,
    maxArgs: -1,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <search>`",
    description: "dc",
    run: async (message, args, text, client, prefix, instance) => {
        if (!args[0]) return message.channel.send("Please specify the query.")

        let result = await urban(args[0]).catch(e => {
            return message.channel.send(`Unknown word phrase of **${args[0]}**, please try again.`)
        })

        const embed = new Discord.MessageEmbed()
            .setColor("#9f5000")
            .setTitle(result.word)
            .setURL(result.urbanURL)
            .setDescription(`**Definition:**\n${result.definition}\n\n**Example:**\n${result.example}`)
            .addField("Author", result.author, true)
            .addField("Rating", `👍 ${result.thumbsUp.toLocaleString()} | 👎 ${result.thumbsDown.toLocaleString()}`)

        if (result.tags.length > 0 && result.tags.join(" ").length < 1024) {
            embed.addField("Tags", result.tags.join(", "), true);
        }

        return message.channel.send(embed)
    }
}
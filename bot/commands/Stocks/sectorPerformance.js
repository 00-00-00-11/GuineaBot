const stocksjs = require("stocks.js");
const stocks = new stocksjs(`${process.env.STOCKS_API_KEY}`)
const Discord = require("discord.js");

module.exports = {
    name: "sectorperformance",
    aliases: ["sector"],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<symbol> <timespan>",
    syntaxError: "*Arguments wrapped in <> are required, [] means it is optional*\n\nYou provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} {ARGUMENTS}`\nFor a list of all commands, do `{PREFIX}info commands`\nFor a list of all command aliases, do `{PREFIX}aliases`\n\nHere is the documentation for the stocks API: <https://www.alphavantage.co/documentation/>",
    description: "i. have. no. idea.",
    run: async (message, args, text, client, prefix, instance) => {
        message.channel.send("If no data is given to you, it probably means that you provided invalid data.").then(emsg => emsg.delete({
            timeout: 5000
        }))

        let symbol = args[0].toUpperCase()
        let timespan = args[1]

        let options = {
            symbol: symbol,
            timespan: timespan
        }

        const embed = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setTitle(`Showing sector performance for stock ${options.symbol.toUpperCase()}`)
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')

        try {
            let results = await stocks.sectorPerformance(options)

            console.log(results)

            let str = ""

            for (let i = 0; i < Object.keys(results).length; i++) {
                str += `**${Object.keys(results)[i]}:** ${Object.values(results)[i]}\n`
            }

            embed.setDescription(str)
            
            message.channel.send(embed)
        } catch (err) {
            console.log(err)
            message.channel.send(`An error occurred: \`${err.message}\``)
        }
    }
}
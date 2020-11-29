const stocksjs = require("stocks.js");
const stocks = new stocksjs(`${process.env.STOCKS_API_KEY}`)
const Discord = require("discord.js");

module.exports = {
    name: "timeindex",
    minArgs: 4,
    maxArgs: 4,
    expectedArgs: "<symbol> <time interval> <time> <amount>",
    syntaxError: "*Arguments wrapped in <> are required, [] means it is optional*\n\nYou provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} {ARGUMENTS}`\nFor a list of all commands, do `{PREFIX}info commands`\nFor a list of all command aliases, do `{PREFIX}aliases`\n\nHere is the documentation for the stocks API: <https://www.alphavantage.co/documentation/>",
    description: "See how a stock is performing over time",
    category: "Stocks",
    run: async (message, args, text, client, prefix, instance) => {
        message.channel.send("If no data is given to you, it probably means that you provided invalid data.\n\nHere is the documentation for the stocks API: <https://www.alphavantage.co/documentation/>").then(emsg => emsg.delete({
            timeout: 30000
        }))

        let symbol = args[0]
        let interval = args[1]
        let time = parseInt(args[2])
        let amount = parseInt(args[3])
        if (isNaN(time)) return message.channel.send("The time has to be a numeric value.")
        if (isNaN(amount)) return message.channel.send("The amount of data has to be a numeric value.")
        if (amount > 25) return message.channel.send("The amount of data has to be less than 25 due to embed limitations.")

        let options = {
            symbol: symbol,
            interval: interval,
            time: time,
            amount: amount
        }

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Showing data for stock ${options.symbol.toUpperCase()}`)
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')

        try {
            let results = await stocks.timeSeries(options)

            for (const result of results) {
                const date = new Date(result.date)
                const dateStr = date.toLocaleDateString()
                const time = date.toLocaleTimeString()
                embed.addField(`Date: ${dateStr + ' ' + time}`, `Open: ${result.open}\nHigh: ${result.high}\nLow: ${result.low}\nClose: ${result.close}\nVolume: ${result.volume}`)
            }
            
            message.channel.send(embed)
        } catch (err) {
            console.log(err)
            message.channel.send(`An error occurred: \`${err.message}\``)
        }
    }
}
const Discord = require('discord.js')
const axios = require("axios").default

module.exports = {
    name: "exchange",
    aliases: ["exch"],
    minArgs: 3,
    maxArgs: 3,
    expectedArgs: "<amount> <from> <to>",
    description: "Exchange money rates, see the rates command for the from and to parameters.",
    category: "Utility",
    run: async ({
        message,
        args,
        text,
        client,
        prefix,
        instance
    }) => {
        const amount = parseFloat(args[0])
        const from = args[1]
        const to = args[2]

        const opts = {
            method: 'GET',
            url: `https://v1.nocodeapi.com/cy1der/cx/${process.env.CUREX_ID}/rates/convert`,
            params: {
                amount: amount,
                from: from,
                to: to,
                api_key: process.env.CUREX_KEY
            }
        }
        axios.request(opts).then(async (res) => {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Currency exchange`)
                .setAuthor(message.author.tag, message.author.avatarURL())
                .addFields({
                    name: "Input",
                    value: `${res.data.query.amount} ${res.data.query.from}`
                }, {
                    name: "Exchange Rate",
                    value: res.data.info.rate
                }, {
                    name: "Output",
                    value: `${res.data.result} ${res.data.query.to}`
                })
                .setTimestamp()
            message.channel.send(embed)
        })
    }
}
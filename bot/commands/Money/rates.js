const Discord = require('discord.js')
const axios = require("axios").default
const bin = require("sourcebin_js")

module.exports = {
    name: "rates",
    minArgs: 0,
    maxArgs: 0,
    description: "See all the rates, real time.",
    category: "Utility",
    run: async ({
        message,
        args,
        text,
        client,
        prefix,
        instance
    }) => {
        const opts = {
            method: 'GET',
            url: `https://v1.nocodeapi.com/cy1der/cx/${process.env.CUREX_ID}/rates/`,
            params: {
                api_key: process.env.CUREX_KEY
            }
        }

        axios.request(opts).then(async (res) => {
            let str = ""
            let rates = Object.entries(res.data.rates)
            
            let codes = []
            let rateNums = []
            for (let i = 0; i < rates.length; i++) {
                codes.push(rates[i][0])
                rateNums.push(rates[i][1])
                str += `${codes[i]}: ${rateNums[i]}\n`
            }

            let URL = await bin.create([{
                name: "GuineaBot/Cy1der",
                content: str,
                languageId: "Text"
            }], {
                title: "Currency exchange rates",
                description: "Rates command executed"
            }).then(bin => {
                return bin.url
            })

            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Currency Exchange Rates [${res.data.date}]`)
                .setURL(URL)
            message.channel.send(embed)
        })
    }
}
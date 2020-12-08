const stocksjs = require("stocks.js");
const stocks = new stocksjs(`${process.env.STOCKS_API_KEY}`)
const Discord = require("discord.js");

module.exports = {
    name: "technicalindicator",
    aliases: ["technical"],
    minArgs: 6,
    maxArgs: 6,
    expectedArgs: "<symbol> <time interval> <amount> <time period> <indicator> <series type>",
    description: "DM ${Cy1der}#0001 if you know, documentation: <https://www.alphavantage.co/documentation/>",
    category: "Stocks",
    run: async (message, args, text, client, prefix, instance) => {
        message.channel.send("If no data is given to you, it probably means that you provided invalid data.\n\nHere is the documentation for the stocks API: <https://www.alphavantage.co/documentation/>").then(emsg => emsg.delete({
            timeout: 30000
        }))

        let symbol = args[0].toUpperCase()
        let interval = args[1]
        let amount = parseInt(args[2])
        let time_period = parseInt(args[3])
        let indicator = args[4]
        let series_type = args[5].toUpperCase()
        if (isNaN(time_period)) return message.channel.send("The time period has to be a numeric value.")
        if (isNaN(amount)) return message.channel.send("The amount of data has to be a numeric value.")
        if (amount > 25) return message.channel.send("The amount of data has to be less than 25 due to embed limitations.")

        let options = {
            symbol: symbol,
            interval: interval,
            time_period: time_period,
            amount: amount,
            indicator: indicator,
            series_type: series_type
        }

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Showing ${options.indicator.toUpperCase()} for stock ${options.symbol.toUpperCase()}`)
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')

        try {
            let results = await stocks.technicalIndicator(options)

            console.log(results)

            if (options.indicator === "SMA") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `SMA: ${result.SMA}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "EMA") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `EMA: ${result.EMA}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "WMA") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `WMA: ${result.WMA}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "DEMA") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `DEMA: ${result.DEMA}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "TEMA") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `TEMA: ${result.TEMA}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "TRIMA") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `TRIMA: ${result.TRIMA}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "KAMA") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `KAMA: ${result.KAMA}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "MAMA") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `MAMA: ${result.MAMA}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "VWAP") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `VWAP: ${result.VWAP}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "T3") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `T3: ${result.T3}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "MACD") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `MACD: ${result.MACD}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "MACDEXT") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `MACDEXT: ${result.MACDEXT}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "STOCH") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `STOCH: ${result.STOCH}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "STOCHF") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `STOCHF: ${result.STOCHF}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "RSI") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `RSI: ${result.RSI}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "STOCHRSI") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `STOCHRSI: ${result.STOCHRSI}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "WILLR") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `WILLR: ${result.WILLR}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "ADX") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `ADX: ${result.ADX}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "ADXR") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `ADXR: ${result.ADXR}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "APO") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `APO: ${result.APO}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "PPO") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `PPO: ${result.PPO}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "MOM") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `MOM: ${result.MOM}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "BOP") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `BOP: ${result.BOP}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "CCI") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `CCI: ${result.CCI}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "CMO") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `CMO: ${result.CMO}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "ROC") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `ROC: ${result.ROC}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "ROCR") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `ROCR: ${result.ROCR}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "AROON") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `AROON: ${result.AROON}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "AROONOSC") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `AROONOSC: ${result.AROONOSC}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "MFI") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `MFI: ${result.MFI}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "TRIX") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `TRIX: ${result.TRIX}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "ULTOSC") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `ULTOSC: ${result.ULTOSC}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "DX") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `DX: ${result.DX}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "MINUS_DI") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `MINUS DI: ${result.MINUS_DI}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "PLUS_DI") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `PLUS DI: ${result.PLUS_DI}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "MINUS_DM") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `MINUS DM: ${result.MINUS_DM}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "PLUS_DM") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `PLUS DM: ${result.PLUS_DM}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "BBANDS") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `BBANDS: ${result.BBANDS}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "MIDPOINT") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `MIDPOINT: ${result.MIDPOINT}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "MIDPRICE") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `MIDPRICE: ${result.MIDPRICE}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "SAR") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `SAR: ${result.SAR}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "TRANGE") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `TRANGE: ${result.TRANGE}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "ATR") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `ATR: ${result.ATR}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "NATR") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `NATR: ${result.NATR}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "AD") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `AD: ${result.AD}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "ADOSC") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `ADOSC: ${result.ADOSC}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "OBV") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `OBV: ${result.OBV}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "HT_TRENDLINE") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `HT TRENDLINE: ${result.HT_TRENDLINE}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "HT_SINE") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `HT SINE: ${result.HT_SINE}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "HT_TRENDMODE") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `HT TRENDMODE: ${result.HT_TRENDMODE}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "HT_DCPERIOD") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `HT DCPERIOD: ${result.HT_DCPERIOD}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "HT_DCPHASE") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `HT DCPHASE: ${result.HT_DCPHASE}`)
                }
                message.channel.send(embed)
            } else if (options.indicator === "HT_PHASOR") {
                for (const result of results) {
                    const date = new Date(result.date)
                    const dateStr = date.toLocaleDateString()
                    const time = date.toLocaleTimeString()

                    
                    embed.addField(`Date: ${dateStr + ' ' + time}`, `HT PHASOR: ${result.HT_PHASOR}`)
                }
                message.channel.send(embed)
            }
        } catch (err) {
            console.log(err)
            message.channel.send(`An error occurred: \`${err.message}\``)
        }
    }
}
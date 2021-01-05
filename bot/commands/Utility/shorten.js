const request = require("request")
const url = require('url')
module.exports = {
    name: 'shorten',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<url>",
    description: "Shorten a URL",
    category: "Utility",
    run: async ({
        message,
        args,
        text,
        client,
        prefix,
        instance
    }) => {
        //if (text && text.includes(">") || text && text.includes("<")) return message.channel.send("<> characters are reserved for percent encoding.")
        let linkregex = /(http|https):\/\/[^ "]+/g

        if (linkregex.test(text)) {
            let linkRequest = {
                destination: url.parse(text),
                domain: {
                    fullName: "rebrand.ly"
                }
            }

            let requestHeaders = {
                "Content-Type": "application/json",
                "apikey": process.env.REBRANDLY,
            }

            request({
                uri: "https://api.rebrandly.com/v1/links",
                method: "POST",
                body: JSON.stringify(linkRequest),
                headers: requestHeaders
            }, function (error, response, body) {
                if (error) return message.channel.send("An error occurred")
                if (!body.shortUrl) return message.channel.send("Invalid link.")
                body = JSON.parse(body)
                message.channel.send("https://" + body.shortUrl)
            })
        } else {
            return message.channel.send('For safety reasons, please include the URL\'s protocol of either https, http. (all in lowercase letters)')
        }
    }
}
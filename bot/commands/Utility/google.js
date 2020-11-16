const Discord = require("discord.js")
const request = require("node-superfetch")
module.exports = {
    name: 'google',
    category: 'utility',
    description: 'Search the world wide web',
    run: async (message, args, client, prefix, command) => {
        let config = {
            GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
        }

        let csx = "5ab753db481f5a6f4"
        let query = args.join(" ")

        if (!query) return message.channel.send("Please enter the search query.")
        href = await search(query)
        if (!href) return message.channel.send("Unknown search.")

        const embed = new Discord.MessageEmbed()
            .setColor("#9f5000")
            .setTitle(href.title)
            .setDescription(href.snippet)
            .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null)
            .setURL(href.link)
            .setFooter("Powered by Google")
            .setTimestamp()

        return message.channel.send(embed)

        async function search(query) {
            const {
                body
            } = await request.get("https://www.googleapis.com/customsearch/v1").query({
                key: config.GOOGLE_API_KEY,
                cx: csx,
                safe: "off",
                q: query
            })

            if (!body.items) return null
            return body.items[0]
        }
    }
}
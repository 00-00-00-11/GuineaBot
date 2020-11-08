const { MessageEmbed } = require("discord.js")
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const YoutubeApi = require("simple-youtube-api")
const youtube = new YoutubeApi(YOUTUBE_API_KEY)

module.exports = {
    name: "search",
    description: "search",
    run: async(message, args, client) => {
        if (!args.length) return message.reply(`Usage: g?${module.exports.name} <video name>`)

        const search = args.join(" ")

        let resultsEmbed = new MessageEmbed()
        .setColor('#9f5000')
        .setTitle(`Results for: ${search}`)
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setThumbnail(message.client.user.avatarURL())
        .setTimestamp()
        .setFooter('Thank you for using GuineaBot!')

        try {
            const results = await youtube.searchVideos(search, 10)
            results.map((video, index) => resultsEmbed.addField(video.shortURL, `${index + 1}. ${video.title}`))

            var resultsMessage = await message.channel.send(resultsEmbed)

            function filter(msg) {
                const pattern = /(^[1-9][0-9]{0,1}$)/g
                return pattern.test(msg.content) && parseInt(msg.content.match(pattern)[0]) <= 10
            }
        } catch (error) {
            console.error(error)
        }
    }
}
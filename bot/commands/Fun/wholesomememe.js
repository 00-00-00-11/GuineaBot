const Discord = require("discord.js")
const got = require("got")
module.exports = {
    name: 'wholesomememe',
    category: 'MEME',
    description: 'Random meme from r/wholesomememes',
    run: async (message, args, client, prefix, command) => {
        const embed = new Discord.MessageEmbed()
        got("https://www.reddit.com/r/wholesomememes/random/.json").then(response => {
            let content = JSON.parse(response.body)
            let permalink = content[0].data.children[0].data.permalink
            let memeUrl = `https://reddit.com${permalink}`
            let memeImage = content[0].data.children[0].data.url
            let memeTitle = content[0].data.children[0].data.title
            let memeUpvotes = content[0].data.children[0].data.ups
            let memeDownvotes = content[0].data.children[0].data.downs
            let memeNumComments = content[0].data.children[0].data.num_comments

            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor("#9f5000")
            embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
            embed.setTimestamp()

            message.channel.send(embed)
        })
    }
}
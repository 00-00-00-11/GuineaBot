const Discord = require("discord.js")
const got = require("got")
module.exports = {
    name: 'dankmeme',
    aliases: [ "dm" ],
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND}`",
    description: 'Random meme from r/dankmemes',
    run: async (message, args, client, prefix, command) => {
        const embed = new Discord.MessageEmbed()
        got("https://www.reddit.com/r/dankmemes/random/.json").then(response => {
            //Fetch most of the data from the reddit post it recieves
            let content = JSON.parse(response.body)
            let permalink = content[0].data.children[0].data.permalink
            let memeUrl = `https://reddit.com${permalink}`
            let memeImage = content[0].data.children[0].data.url
            let memeTitle = content[0].data.children[0].data.title
            let memeUpvotes = content[0].data.children[0].data.ups
            let memeDownvotes = content[0].data.children[0].data.downs
            let memeNumComments = content[0].data.children[0].data.num_comments
    
            //Put it all in an embed so it looks organized and pretty
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor("#9f5000")
            embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
            embed.setTimestamp()

            //Send it back
            message.channel.send(embed)
        })
    }
}
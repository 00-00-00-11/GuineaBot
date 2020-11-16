const cheerio = require("cheerio")
const Discord = require("discord.js")
const request = require("request")
module.exports = {
    name: 'guineapig',
    category: 'fun',
    description: 'Random picture of a Guinea Pig',
    run: async (message, args, client, prefix, command) => {
        function image(message) {
            var options = {
                url: "http://results.dogpile.com/serp?qc=images&q=" + "guinea pig",
                method: "GET",
                headers: {
                    "Accept": "text/html",
                    "User-Agent": "Chrome"
                }
            }

            request(options, function (error, response, responseBody) {
                if (error) return

                $ = cheerio.load(responseBody)

                var links = $(".image a.link")
                var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"))

                console.log(urls)
                if (!urls.length) return

                let randomize = ["Piggy!", "awww", "Guinea pig!", "🐹", "r/guineapigs", "Snuggle time!", "G u i n e a p i g", "P i g g y", "Guinea pog"]
                let messageTitle;
                let randomTitle = Math.floor(Math.random() * randomize.length)
                messageTitle = randomize[randomTitle]

                let embed = new Discord.MessageEmbed()
                    .setColor('#9f5000')
                    .setTitle(messageTitle)
                    .setTimestamp()
                    .setImage(urls[Math.floor(Math.random() * urls.length)])
                    .setFooter('Thank you for using GuineaBot!')
                    .setAuthor(message.author.tag, message.author.avatarURL())

                message.channel.send(embed)
            })
        }

        image(message)
    }
}
const cheerio = require("cheerio")
const Discord = require("discord.js")
const request = require("request")
module.exports= {
    name: 'image',
    category: 'fun',
    description: 'IMAGES!',
    run: async(message, args, client) => {
        let imagesearch = args.slice(0).join(" ")

        if (!imagesearch) {
            return message.reply("Please specifiy what image to search for.")
        }

        function image(message) {
            var options = {
                url: "http://results.dogpile.com/serp?qc=images&q=" + imagesearch,
                method: "GET",
                headers: {
                    "Accept": "text/html",
                    "User-Agent": "Chrome"
                }
            }

            request(options, function(error, response, responseBody) {
                if (error) return

                $ = cheerio.load(responseBody)

                var links = $(".image a.link")
                var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"))

                console.log(urls)
                if (!urls.length) return

                let embed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle(`Showing random image for: "${imagesearch}"`)
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
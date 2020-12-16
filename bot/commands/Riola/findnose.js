const Discord = require("discord.js")
module.exports = {
    name: "findnose",
    minArgs: 0,
    maxArgs: 0,
    description: "[Find Magyk14's nose](https://discord.gg/GWu42km)",
    category: "Fun & Games",
    run: async (message, args, text, client, prefix, instance) => {
        if (message.guild.id !== "618454511685599268") {
            const riolaEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('Riola Info')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Riola member? You have exclusive commands!')
                .setThumbnail(message.client.user.avatarURL())
                .addFields({
                    name: 'Server Invite: ',
                    value: '[Riola](https://discord.gg/GWu42km)'
                }, {
                    name: 'Commands: ',
                    value: '`findnose`'
                })
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.reply("You are not using this command in the Riola Discord server.", riolaEmbed)
            return
        }

        if (message.author.id === "561661162715086848") {
            message.reply("I have gone on a worldwide search to find your beloved nose, check this channel in 3 hours.")
        } else {
            message.reply("Thanks for helping magyk14 search his nose! Check this channel in 3 hours.")
        }

        setTimeout(() => {
            const results = Math.floor(Math.random() * 250)

            if (results === 250) {
                const nose = new Discord.MessageAttachment("./assets/nose/nose.jpg", "nose.jpg")
                message.reply("I have found your nose! Here it is!", nose)
                console.log(results)
                return
            } else {
                message.reply("I could not find your nose. :(")
                console.log(results)
                return
            }
        }, 10800000)
    }
}
const Discord = require("discord.js")
module.exports = {
    name: "findnose",
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND}`",
    description: "dc",
    run: async (message, args, text, client, prefix, instance) => {
        if (message.guild.id !== "618454511685599268") {
            const riolaEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
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
            message.reply("You are not a member of the Riola Discord server.", riolaEmbed)
            return
        }

        if (message.author.id === "561661162715086848") {
            message.reply("I have gone on a worldwide search to find your beloved nose, check this channel in 12 hours.")
        } else {
            message.reply("Thanks for helping magyk14 search his nose! Check this channel in 12 hours.")
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
        }, 43200000)
    }
}
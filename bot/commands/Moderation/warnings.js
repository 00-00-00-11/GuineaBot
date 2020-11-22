const mongo = require('../../mongo')
const warnSchema = require("../../schemas/warn-schema")
const Discord = require("discord.js")

module.exports = {
    name: "warnings",
    aliases: [ "warns"],
    minArgs: 0,
    maxArgs: 1,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <mention (optional)>`",
    description: "show warns",
    run: async (message, args, text, client, prefix, instance) => {
        let
         target = message.mentions.users.first()
        if (!target) {
            target = message.author
        }

        const guildId = message.guild.id
        const userId = target.id

        await mongo().then(async (mongoose) => {
            try {
                const results = await warnSchema.findOne({
                    guildId,
                    userId
                })

                if (!results) return message.channel.send(`${target.tag} has no warnings. :)`)

                const embed = new Discord.MessageEmbed()
                    .setColor('#9f5000')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setTitle(`Previous warnings for ${target.tag}`)
                    .setTimestamp()
                    .setFooter('Thank you for using GuineaBot!')
                
                let warnlist = ""

                for (const warning of results.warnings) {
                    const {
                        author,
                        timestamp,
                        reason
                    } = warning

                    warnlist += `\`${reason}\` • On ${new Date(timestamp).toLocaleString()} by ${author}\n`
                }
                embed.setDescription(warnlist)
                message.channel.send(embed)
            } catch (e) {
                console.log(e)
            }
        })
    }
}
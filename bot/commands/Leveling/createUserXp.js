const discordXP = require('discord-xp')
const Discord = require("discord.js")
module.exports = {
    name: 'createuserxp',
    category: 'leveling',
    description: 'Create a XP entry in the database',
    run: async (message, args, client, prefix, command) => {
        if (message.author.id !== message.guild.ownerID) {
            const nopermsEmbed = new Discord.MessageEmbed()
                .setColor("#9f5000")
                .setTitle('Create user XP unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("You are not the owner of the server.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(nopermsEmbed)
            return
        }

        let target = message.mentions.members.first() || message.author
        discordXP.createUser(target.id, message.guild.id)

        message.channel.send(`Created database entry for ${target}.`)
    }
}
const discordXP = require('discord-xp')
const Discord = require("discord.js")
module.exports = {
    name: 'deleteuserxp',
    category: 'leveling',
    description: "Delete a member's XP in the database",
    run: async (message, args, client, prefix, command) => {
        if (message.author.id !== message.guild.ownerID) {
            const nopermsEmbed = new Discord.MessageEmbed()
                .setColor("#9f5000")
                .setTitle('Delete user XP unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("You are not the owner of the server.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(nopermsEmbed)
            return
        }

        let target = message.mentions.members.first() || message.author
        discordXP.deleteUser(target.id, message.guild.id)

        message.channel.send(`Deleted XP database for ${target}.`)
    }
}
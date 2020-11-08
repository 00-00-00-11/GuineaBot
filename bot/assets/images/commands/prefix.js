const Discord = require('discord.js')
const db = require('quick.db')
const { PREFIX } = require('../config.json')
const fs = require('fs')

module.exports= {
    name: 'prefix',
    category: 'moderation',
    description: 'change prefix of command',
    run: async(message, args, client) => {

        if(!message.member.hasPermission("ADMINISTRATOR", explicit = true)) {
            const permEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Prefix change unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("You don't have the correct permissions.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(permEmbed)
            return
        } else if (!message.guild.me.hasPermission("ADMINISTRATOR")){
            const permEmbed2 = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Prefix change unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("I don't have the correct permissions. Try re-inviting me and adding `Administrator` permission. If this problem occurs, do g?info support.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(permEmbed2)
            return
        }

        if (!args[0]) {
            const preEmbed2 = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Prefix change unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("Please give the prefix you want to change to.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(preEmbed2)
            return
        }
        
        if (args[1]) {
            const preEmbed3 = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Prefix change unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("Prefix cannot include a space.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(preEmbed3)
            return
        }

        if (args[0].length > 3){
            const preEmbed4 = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Prefix change unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("Prefix cannot be more than 3 characters.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(preEmbed4)
            return
        }

        const preEmbed5 = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setTitle('Prefix change successful')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription("Resetted prefix to default (g?)")
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')

        if (args.join("") === PREFIX) {
            db.delete(`prefix_${message.guild.id}`)
            await message.channel.send(preEmbed5)
            console.log(`Prefix resetted to default in ${message.guild.name} (${message.guild.id}).`)
            return
        }

        const preEmbed6 = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setTitle('Prefix change successful')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription(`Prefix changed to **${args[0]}**.`)
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')
        
        db.set(`prefix_${message.guild.id}`, args[0])
        await message.channel.send(preEmbed6)
        console.log(`Prefix changed to ${args[0]} in ${message.guild.name} (${message.guild.id}).`)
    }
}
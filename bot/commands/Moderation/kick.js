const Discord = require('discord.js')
module.exports = {
    name: 'kick',
    category: 'moderation',
    description: 'Kick a guild member from the guild.',
    run: async (message, args, client, prefix, command) => {

        let kicked = message.mentions.members.first()
        let reason = args.slice(1).join(" ");
        let modlog = message.guild.channels.cache.find(channel => channel.name === "g-modlog")

        if (!modlog) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Kick unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setDescription('It looks like \`setup\` command has not been performed yet. Please contact an administrator')
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(modlogEmbed)
            return
        }

        if (!kicked) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Kick unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Specify who to kick.')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)
            return;
        }

        if (message.author === kicked) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Kick unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('You cannot kick yourself. Why would you do that?')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)
            return;
        }

        if (kicked.id === message.channel.id) {
            message.channel.send("Nice try kicking everyone... :)")
            return
        }

        if (!reason) {
            reason = 'No reason given'
        }

        if (!message.member.hasPermission("KICK_MEMBERS", explicit = true)) {
            const kickpermEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Kick unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("You don't have the correct permissions.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(kickpermEmbed)
            return
        } else if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            const kickpermEmbed2 = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Kick unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("I don't have the correct permissions. Try re-inviting me and adding `Kick Members` permission. If this problem occurs, do info command with support argument.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(kickpermEmbed2)
            return
        }

        if (message.member.roles.highest.position < kicked.roles.highest.position || message.member.roles.highest.position === kicked.roles.highest.position) {
            const superiorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Kick unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('The person you are trying to kick has a role superior or equal to you.')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(superiorEmbed)
            return
        }

        if (kicked.id === message.author.id) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Kick unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('You cannot kick yourself. Why would you do that?')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)
            return
        }

        if (kicked.id === '727288620221857843') {
            const errorEmbed2 = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Kick unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('You cannot kick me using me! Why would you do that?')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed2)
            return
        }

        message.guild.member(kicked).kick(reason);

        const kickSuccessEmbed = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setTitle('Kick successful')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription(`Successfully kicked **${kicked.user.tag}** for **${reason}**.`)
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')
        message.channel.send(kickSuccessEmbed).catch(err => {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Kick unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('An unexpected error occurred, if this problem persists, please do g?info support.')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)
            console.log(err)
        });

        kicked.send(`You were kicked from **${message.guild.name}** for **${reason}**.`).catch(() => message.channel.send("I wasn't able to send a DM to the kicked user. Don't worry! He was kicked anyway."))

        const logEmbed = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setTitle('Kick command executed')
            .setAuthor('Modlog')
            .addFields({
                name: 'Moderator: ',
                value: `${message.author.tag} (${message.author.id})`
            }, {
                name: 'Moderated on: ',
                value: `${kicked.user.tag} (${kicked.id})`
            }, {
                name: 'Reason: ',
                value: `${reason}`
            }, {
                name: 'Date: ',
                value: `${message.createdAt.toLocaleString()}`
            })
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')
        modlog.send(logEmbed)
    }
}
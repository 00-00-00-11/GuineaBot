const Discord = require('discord.js')
module.exports = {
    name: 'ban',
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<mention> [reason]",
    description: "ban",
    run: async (message, args, text, client, prefix, instance) => {

        let banned = message.mentions.members.first()
        let reason = args.slice(1).join(" ");
        let modlog = message.guild.channels.cache.find(channel => channel.name === "g-modlog")

        if (!modlog) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Ban unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`It looks like \`setup\` command has not been performed yet. Please contact an administrator`)
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(modlogEmbed)
            return
        }

        if (!banned) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Ban unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Specify who to ban.')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)
            return;
        }

        if (message.author === banned) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Ban unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('You cannot ban yourself. Why would you do that?')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)
            return;
        }

        if (!reason) {
            reason = 'No reason given'
        }

        if (!message.member.hasPermission("BAN_MEMBERS", explicit = true)) {
            const banpermEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Ban unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("You don't have the correct permissions.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(banpermEmbed)
            return
        } else if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            const banpermEmbed2 = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Ban unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("I don't have the correct permissions. Try re-inviting me and adding `Ban Members` permission. If this problem occurs, do g?info support.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(banpermEmbed2)
            return
        }

        if (message.member.roles.highest.position < banned.roles.highest.position || message.member.roles.highest.position === banned.roles.highest.position) {
            const superiorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Ban unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('The person you are trying to ban has a role superior or equal to you.')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(superiorEmbed)
            return
        }

        if (banned.id === message.author.id) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Ban unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('You cannot ban yourself. Why would you do that?')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)
            return
        }

        if (banned.id === message.guild.id) {
            message.channel.send("Nice try banning everyone... :)")
            return
        }

        message.guild.members.ban(banned, {
            reason: reason
        })

        const banSuccessEmbed = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setTitle('Ban successful')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription(`Successfully banned **${banned.user.tag}** for **${reason}**.`)
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')
        message.channel.send(banSuccessEmbed).catch(err => {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Ban unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('An unexpected error occurred, if this problem persists, please do g?info support.')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)
            console.log(err)
        });

        banned.send(`You were banned from **${message.guild.name}** for **${reason}**.`).catch(() => message.channel.send("I wasn't able to send a DM to the banned user. Don't worry! He was banned anyway."))

        const logEmbed = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setTitle('Ban command executed')
            .setAuthor('Modlog')
            .addFields({
                name: 'Moderator: ',
                value: `${message.author.tag} (${message.author.id})`
            }, {
                name: 'Moderated on: ',
                value: `${banned.user.tag} (${banned.id})`
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
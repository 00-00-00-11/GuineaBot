const Discord = require('discord.js')
module.exports = {
    name: 'unban',
    category: 'moderation',
    description: 'Pardon a member and allow them to join back to the guild.',
    run: async (message, args, client) => {
        if (!args[0]) {
            const errorEmbed2 = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unban unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("Specify the banned user's ID.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed2)
            return;
        }
        let unbanned = await message.client.users.fetch(args[0])
        let reason = args.slice(1).join(" ");
        let modlog = message.guild.channels.cache.find(channel => channel.name === "g-modlog")

        if (!modlog) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unban unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setDescription('It looks like \`setup\` command has not been performed yet. Please contact an administrator')
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(modlogEmbed)
            return
        }

        if (!unbanned) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unban unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("Specify the banned user's ID.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)
            return;
        }

        if (message.author === unbanned) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unban unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('You cannot unban yourself. Why would you do that?')
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
            const unbanpermEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unban unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("You don't have the correct permissions.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(unbanpermEmbed)
            return
        } else if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            const unbanpermEmbed2 = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unban unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("I don't have the correct permissions. Try re-inviting me and adding \`Ban Members\` permission. If this problem occurs, do g?info support.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(unbanpermEmbed2)
            return
        }

        if (unbanned.id === message.author.id) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unban unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('You cannot unban yourself. Why would you do that?')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)
            return
        }

        if (unbanned.id === message.channel.id) {
            message.channel.send("Nice try unbanning everyone... :)")
            return
        }

        message.guild.members.unban(unbanned).catch(err => {
            const probcharEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unban unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('No banned user found. It could be one of **2** errors: \`The user was not banned in the first place\` **OR** \`Invalid ID: A user ID does not have any letters in it\`. If not, do g?info support.')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(probcharEmbed)
            console.log(err)
        })

        const unbanSuccessEmbed = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setTitle('Unban successful')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription(`Successfully unbanned **${unbanned.tag}** for **${reason}**.`)
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')
        message.channel.send(unbanSuccessEmbed)
        unbanned.send(`You were unbanned from **${message.guild.name}** for **${reason}**.`).catch(() => message.channel.send("I wasn't able to send a DM to the unbanned user. Don't worry! He was unbanned anyway."))

        const logEmbed = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setTitle('Unban command executed')
            .setAuthor('Modlog')
            .addFields({
                name: 'Moderator: ',
                value: `${message.author.tag} (${message.author.id})`
            }, {
                name: 'Moderated on: ',
                value: `${unbanned.tag} (${unbanned.id})`
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
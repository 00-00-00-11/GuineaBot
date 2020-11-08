const Discord = require('discord.js')
module.exports = {
    name: 'unmute',
    category: 'moderation',
    description: 'Allow a member to talk in voice channels.',
    run: async (message, args, client) => {

        let modlog = message.guild.channels.cache.find(channel => channel.name === "g-modlog")
        let unmuteuser = message.mentions.members.first();
        let reason = args.slice(1).join(" ")

        if (!modlog) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setDescription('It looks like \`setup\` command has not been performed yet. Please contact an administrator')
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(modlogEmbed)
            return
        }

        if (!unmuteuser) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('unmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Specify who to unmute.')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)
            return;
        }

        if (message.author === unmuteuser) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('You cannot unmute yourself. Why would you do that?')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)
            return;
        }

        if (!reason) {
            reason = 'No reason given'
        }

        if (!message.member.hasPermission("MANAGE_ROLES", explicit = true)) {
            const mutepermEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("You don't have the correct permissions.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(mutepermEmbed)
            return
        } else if (!message.member.hasPermission("MANAGE_ROLES", explicit = true)) {
            const mutepermEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("I don't have the correct permissions. Try re-inviting me and adding `Manage roles` permission. If this problem occurs, do info command with support argument.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(mutepermEmbed)
            return
        }

        if (message.member.roles.highest.position < unmuteuser.roles.highest.position || message.member.roles.highest.position === unmuteuser.roles.highest.position) {
            const superiorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('The person you are trying to unmute has a role superior or equal to you.')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(superiorEmbed)
            return
        }

        if (unmuteuser.id === message.author.id) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('You cannot unmute yourself. Why would you do that?')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)
            return
        }

        if (unmuteuser.id === message.guild.id) {
            message.channel.send("Nice try unmuting everyone... :)")
            return
        }

        let muterole = message.guild.roles.cache.find(x => x.name === "gmuted")

        if (!muterole) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setDescription('It looks like \`setup\` command has not been performed yet. Please contact an administrator')
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(modlogEmbed)
            return
        } else if (!unmuteuser.roles.cache.has(muterole.id)) {
            const mutemmutedEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("That user is already unmuted.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(mutemmutedEmbed)
            return
        } else {
            unmuteuser.roles.remove(muterole)
            const muteEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unmute successful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`Successfully unmuted **${unmuteuser.user.username}** for **${reason}**.`)
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(muteEmbed)
            unmuteuser.send(`You are unmuted in **${message.guild.name}** for **${reason}**`).catch(() => message.channel.send("I wasn't able to send a DM to the unmuted user. Don't worry! He was unmuted anyway."))
        }

        const logEmbed = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setTitle('Unmute command executed')
            .setAuthor('Modlog')
            .addFields({
                name: 'Moderator: ',
                value: `${message.author.tag} (${message.author.id})`
            }, {
                name: 'Moderated on: ',
                value: `${unmuteuser.user.tag} (${unmuteuser.id})`
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
        console.log(`${unmuteuser.user.tag} unmuted in ${message.guild.name} (${message.guild.id}) for ${reason}.`)
    }
}
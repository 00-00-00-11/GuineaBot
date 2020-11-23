const Discord = require('discord.js')
module.exports = {
    name: 'unchatmute',
    aliases: [ 'ucm' ],
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<mention> [reason]",
    description: "remove mute",
    run: async (message, args, text, client, prefix, instance) => {

        let modlog = message.guild.channels.cache.find(channel => channel.name === "g-modlog")
        let muteuser = message.mentions.members.first();
        let reason = args.slice(1).join(" ")

        if (!modlog) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Un chat mute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setDescription('It looks like \`setup\` command has not been performed yet. Please contact an administrator')
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(modlogEmbed)
            return
        }

        if (!muteuser) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Un chat mute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Specify who to un chat mute.')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)
            return;
        }

        if (message.author === muteuser) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Un chat mute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('You cannot un chat mute yourself. Why would you do that?')
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
                .setTitle('Un chat mute unsuccessful')
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
                .setTitle('Un chat mute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("I don't have the correct permissions. Try re-inviting me and adding `Manage roles` permission. If this problem occurs, do info command with support argument.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(mutepermEmbed)
            return
        }

        if (message.member.roles.highest.position < muteuser.roles.highest.position || message.member.roles.highest.position === muteuser.roles.highest.position) {
            const superiorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Un chat mute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('The person you are trying to un chat mute has a role superior or equal to you.')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(superiorEmbed)
            return
        }

        if (muteuser.id === message.author.id) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Un chat mute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('You cannot un chat mute yourself. Why would you do that?')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)
            return
        }

        if (muteuser.id === message.channel.id) {
            message.channel.send("Nice try muting everyone... :)")
            return
        }

        let muterole = message.guild.roles.cache.find(x => x.name === "gmuted")

        if (!muterole) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Un chat mute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setDescription('It looks like \`setup\` command has not been performed yet. Please contact an administrator')
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(modlogEmbed)
            return
        } else if (!muteuser.roles.cache.has(muterole.id)) {
            const mutemmutedEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Un chat mute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("That user is already un chat muted.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(mutemmutedEmbed)
            return
        } else {
            muteuser.roles.remove(muterole)
            const muteEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Un chat mute successful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`Successfully un chat muted **${muteuser.user.username}** for **${reason}**.`)
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(muteEmbed)
            muteuser.send(`You are un chat muted in **${message.guild.name}** for **${reason}**`).catch(() => message.channel.send("I wasn't able to send a DM to the un chat muted user. Don't worry! He was un chat muted anyway."))
        }

        const logEmbed = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setTitle('Un chat mute command executed')
            .setAuthor('Modlog')
            .addFields({
                name: 'Moderator: ',
                value: `${message.author.tag} (${message.author.id})`
            }, {
                name: 'Moderated on: ',
                value: `${muteuser.user.tag} (${muteuser.id})`
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
        console.log(`${muteuser.user.tag} un chat muted in ${message.guild.name} (${message.guild.id}) for ${reason}.`)
    }
}
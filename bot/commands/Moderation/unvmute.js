const Discord = require('discord.js')
module.exports= {
    name: 'unvmute',
    category: 'moderation',
    description: 'unvmute dem good bois',
    run: async(message, args, client) => {

        let modlog = message.guild.channels.cache.find(channel => channel.name === "g-modlog")
        let unvmuteuser = message.mentions.members.first();
        let reason = args.slice(1).join(" ")

        if (!modlog) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unvmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setDescription('It looks like \`setup\` command has not been performed yet. Please contact an administrator')
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(modlogEmbed)
            return
        }

        if (!unvmuteuser) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unvmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Specify who to unvmute.')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)        
            return;
        }
    
        if (message.author === unvmuteuser) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unvmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('You cannot unvmute yourself. Why would you do that?')
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
                .setTitle('Unvmute unsuccessful')
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
                .setTitle('Unvmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("I don't have the correct permissions. Try re-inviting me and adding `Manage roles` permission. If this problem occurs, do info command with support argument.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(mutepermEmbed)
            return
        }

        if (message.member.roles.highest.position < unvmuteuser.roles.highest.position || message.member.roles.highest.position === unvmuteuser.roles.highest.position) {
            const superiorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unvmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('The person you are trying to unvmute has a role superior or equal to you.')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(superiorEmbed)
            return
        }

        if (unvmuteuser.id === message.author.id) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unvmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('You cannot unvmute yourself. Why would you do that?')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(errorEmbed)
            return
        }

        if (unvmuteuser.id === message.guild.id) {
            message.channel.send("Nice try unvmuting everyone... :)")
            return
        }

        let vmuterole = message.guild.roles.cache.find(x => x.name === "gmuted")

        if (!vmuterole) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unvmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setDescription('It looks like \`setup\` command has not been performed yet. Please contact an administrator')
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(modlogEmbed)
            return
        } else if (!unvmuteuser.roles.cache.has(vmuterole.id)) {
            const mutemmutedEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unvmute unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("That user is already unvmuted.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(mutemmutedEmbed)
            return
        } else {
            unvmuteuser.roles.remove(vmuterole)
            const muteEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unvmute successful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`Successfully unvmuted **${unvmuteuser.user.username}** for **${reason}**.`)
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(muteEmbed)
            unvmuteuser.send(`You are unvmuted in **${message.guild.name}** for **${reason}**`).catch(() => message.channel.send("I wasn't able to send a DM to the unvmuted user. Don't worry! He was unvmuted anyway."))
        }
        
        const logEmbed = new Discord.MessageEmbed()
            .setColor('#9f5000')
            .setTitle('Unvmute command executed')
            .setAuthor('Modlog')
            .addFields(
                { name: 'Moderator: ', value: `${message.author.tag} (${message.author.id})`},
                { name: 'Moderated on: ', value: `${unvmuteuser.user.tag} (${unvmuteuser.id})`},
                { name: 'Reason: ', value: `${reason}`},
                { name: 'Date: ', value: `${message.createdAt.toLocaleString()}`}
            )
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')
        modlog.send(logEmbed)
        console.log(`${unvmuteuser.user.tag} unvmuted in ${message.guild.name} (${message.guild.id}) for ${reason}.`)
    }
}
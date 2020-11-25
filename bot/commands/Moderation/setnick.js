const Discord = require('discord.js')
module.exports = {
    name: 'setnick',
    aliases: [ "nick" ],
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "[mention] <new nickname>",
    description: "Set a user's nickname'",
    category: "Moderation",
    run: async (message, args, text, client, prefix, instance) => {

        let member = message.mentions.members.first()
        let modlog = message.guild.channels.cache.find(channel => channel.name === "g-modlog")

        if (!modlog) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('Nickname change unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setDescription(`It looks like \`setup\` command has not been performed yet. Please contact an administrator`)
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(modlogEmbed)
            return
        }

        if (member) {

            let oldnickmention = member.displayName
            let memberArg = args.slice(1).join(" ")

            if (!memberArg) {
                const nomemberarg = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle('Nickname change unsuccessful')
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setDescription(`Since you mentioned a member, please state the new nickname.`)
                    .setTimestamp()
                    .setFooter('Thank you for using GuineaBot!')
                message.channel.send(nomemberarg)
                return
            }

            if (!message.member.hasPermission("MANAGE_NICKNAMES", explicit = true)) {
                const perms = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle('Nickname change unsuccessful')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription("You don't have the correct permissions.")
                    .setThumbnail(message.client.user.avatarURL())
                    .setTimestamp()
                    .setFooter('Thank you for using GuineaBot!')
                message.channel.send(perms)
                return
            } else if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) {
                const perms2 = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle('Nickname change unsuccessful')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription("I don't have the correct permissions. Try re-inviting me and adding `Manage Nicknames` permission. If this problem occurs, do g?info support.")
                    .setThumbnail(message.client.user.avatarURL())
                    .setTimestamp()
                    .setFooter('Thank you for using GuineaBot!')
                message.channel.send(perms2)
                return
            }

            if (member === message.guild.owner) {
                const superiorEmbed1 = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle('Nickname change unsuccessful')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription('The person you are trying to change their nickname is the owner of the server')
                    .setThumbnail(message.client.user.avatarURL())
                    .setTimestamp()
                    .setFooter('Thank you for using GuineaBot!')
                message.channel.send(superiorEmbed1)
                return
            }

            if (message.member.roles.highest.position < member.roles.highest.position || message.member.roles.highest.position === member.roles.highest.position) {
                const superiorEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle('Nickname change unsuccessful')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription('The person you are trying to change their nickname has a role superior or equal to you.')
                    .setThumbnail(message.client.user.avatarURL())
                    .setTimestamp()
                    .setFooter('Thank you for using GuineaBot!')
                message.channel.send(superiorEmbed)
                return
            }

            if (member.id === message.channel.id) {
                message.channel.send("Nice try changing everyone's nicknames... :)")
                return
            }

            if (memberArg.length > 32) return message.channel.send("Nickname must be between 2 and 32 characters long.")
            if (memberArg.length < 2) return message.channel.send("Nickname must be between 2 and 32 characters long.")
            await member.setNickname(memberArg)

            const successping = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('Nickname change successful')
                .setDescription(`Successfully changed **${oldnickmention}'s** nickname to **${memberArg}**.`)
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.reply(successping)

            const logEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('Setnick command executed')
                .setAuthor('Modlog')
                .addFields({
                    name: 'Moderator: ',
                    value: `${message.author.tag} (${message.author.id})`
                }, {
                    name: 'Moderated on: ',
                    value: `${member.user.tag} (${member.id})`
                }, {
                    name: 'Old nickname: ',
                    value: `${oldnickmention}`,
                    inline: true
                }, {
                    name: 'New nickname: ',
                    value: `${memberArg}`,
                    inline: true
                }, {
                    name: 'Date: ',
                    value: `${message.createdAt.toLocaleString()}`
                })
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            modlog.send(logEmbed)
        } else if (!member) {
            let selfArg = args.slice(0).join(" ")
            let oldnickself = message.member.displayName
            if (!selfArg) {
                const noselfarg = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle('Nickname change unsuccessful')
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setDescription(`Since you did not mention a member, please state the new nickname to set as yours.`)
                    .setTimestamp()
                    .setFooter('Thank you for using GuineaBot!')
                message.channel.send(noselfarg)
                return
            }

            if (message.author.id === message.guild.ownerID) {
                const permsowner = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle('Nickname change unsuccessful')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription("I cannot change your nickname since you are the owner of the server.")
                    .setThumbnail(message.client.user.avatarURL())
                    .setTimestamp()
                    .setFooter('Thank you for using GuineaBot!')
                message.channel.send(permsowner)
                return
            }

            if (!message.member.hasPermission("CHANGE_NICKNAME", explicit = true)) {
                const perms = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle('Nickname change unsuccessful')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription("You don't have the correct permissions.")
                    .setThumbnail(message.client.user.avatarURL())
                    .setTimestamp()
                    .setFooter('Thank you for using GuineaBot!')
                message.channel.send(perms)
                return
            } else if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) {
                const perms2 = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle('Nickname change unsuccessful')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription("I don't have the correct permissions. Try re-inviting me and adding `Manage Nicknames` permission. If this problem occurs, do g?info support.")
                    .setThumbnail(message.client.user.avatarURL())
                    .setTimestamp()
                    .setFooter('Thank you for using GuineaBot!')
                message.channel.send(perms2)
                return
            }

            if (selfArg.length > 32) return message.channel.send("Nickname must be between 2 and 32 characters long.")
            if (selfArg.length < 2) return message.channel.send("Nickname must be between 2 and 32 characters long.")
            await message.member.setNickname(selfArg)

            const successSelf = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('Nickname change successful')
                .setDescription(`Successfully changed your nickname to **${selfArg}**.`)
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.reply(successSelf)

            const logEmbed2 = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('Setnick command executed')
                .setDescription(`${message.author.tag} (${message.author.id}) changed their own nickname.`)
                .setAuthor('Modlog')
                .addFields({
                    name: 'Old nickname: ',
                    value: `${oldnickself}`,
                    inline: true
                }, {
                    name: 'New nickname: ',
                    value: `${selfArg}`,
                    inline: true
                }, {
                    name: 'Date: ',
                    value: `${message.createdAt.toLocaleString()}`
                })
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            modlog.send(logEmbed2)
        }
    }
}
const Discord = require("discord.js")
module.exports = {
    name: 'info',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<one of the following: version, server, support, riola>",
    description: "information about Guineabot",
    category: "Help",
    run: async (message, args, text, client, prefix, instance) => {
        if (args[0] === 'version') {

            const version = '0.5.0'

            const versionEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('Version')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Current version of GuineaBot is **' + version + '**.')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(versionEmbed)
            return
        } else if (args[0] === 'server') {
            const serverEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('Servers')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setThumbnail(message.client.user.avatarURL())
                .addFields({
                    name: 'Official GuineaBot server: ',
                    value: 'Coming soon!'
                })
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(serverEmbed)
            return
        } else if (args[0] === 'support') {
            const supportEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('Found a bug?')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Contact Cy1der! The creator of this bot.')
                .setThumbnail(message.client.user.avatarURL())
                .addFields({
                    name: 'DM Cy1der: ',
                    value: 'Just DM him at **${Cy1der}#0001**.'
                }, {
                    name: 'Email: ',
                    value: 'Give him an email at **mrvenomousgd@gmail.com**'
                })
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(supportEmbed)
            return
        } else if (args[0] === "riola") {
            const riolaEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('Riola Info')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Riola member? You have exclusive commands!')
                .setThumbnail(message.client.user.avatarURL())
                .addFields({
                    name: 'Server Invite: ',
                    value: '[Riola](https://discord.gg/GWu42km)'
                }, {
                    name: 'Commands: ',
                    value: '`findnose`'
                })
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(riolaEmbed)
            return
        }
    }
}
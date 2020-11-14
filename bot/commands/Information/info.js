const Discord = require("discord.js")
module.exports = {
    name: 'info',
    category: 'guides',
    description: 'All the information you need about GuineaBot',
    run: async (message, args, client) => {
        if (args[0] === 'version') {

            const version = '0.4.7'

            const versionEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Version')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Current version of GuineaBot is **' + version + '**.')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(versionEmbed)
            return
        } else if (args[0] === 'commands') {
            const commandEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Commands')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Available GuineaBot commands:')
                .addFields({
                    name: "Bot Owner ",
                    value: "`kill` | `cmd`",
                }, {
                    name: 'Server Owner',
                    value: '`setup`',
                }, {
                    name: 'Server Management',
                    value: "`createtextchannel` | `deletetextchannel` | `createvoicechannel` | `deletevoicechannel`",
                }, {
                    name: 'Moderation',
                    value: '`chatmute` | `unchatmute` | `voicemute` | `unvoicemute` | `deafen` | `undeafen` | `ban` | `unban` | `clear` | `kick` | `prefix` | `setnick` | `warn` | `warnings` | `removewarn`',
                }, {
                    name: 'Music',
                    value: '`loop` | `lyrics` | `nowplaying` | `pause` | `play` | `playlist` | `pruning` | `queue` | `remove` | `resume` | `search` | `shuffle` | `skip` | `stop` | `skipto` | `volume` | `connect` | `disconnect`',
                }, {
                    name: 'Leveling',
                    value: '`rank` | `leaderboard` | `required` | `createuserxp` | `deleteuserxp` | `addxp` | `removexp` | `addlevel` | `removelevel` | `setxp` | `setlevel`',
                }, {
                    name: "Utility",
                    value: '`randomnumber` | `randomnumberrange` | `code` | `ping` | `binary` | `urban` | `google` | `spotify` | `weather` | `avatar` | `calc` | `anonymous` | `temporary`',
                }, {
                    name: 'Fun',
                    value: '`beep` | `foo` | `wheek` | `image` | `guineapig` | `dankmeme` | `wholesomememe` | `ascii` | `coolkid` | `debate` | `8ball` | `sarcastic` | `simp` | `gamer` | `cleverbot`',
                }, {
                    name: "Games",
                    value: "`snake` | `minesweeper` | `rps` | `guessnum` | `connect4` | `hangman` | `chess` | `tictactoe`",
                }, {
                    name: "Image generation",
                    value: "`abandon` | `aborted`  | `affect` | `airpods` | `america` | `armor` | `balloon` | `banfilth` | `slap` | `bed` | `bongocat` | `boo` | `edgedetect` | `emboss` | `blur` | `sobel` | `sharpen` | `brain` | `byemom` | `deepfry`",
                }, {
                    name: 'Info',
                    value: '`info` | `help (currently disabled)` | `stats` | `serverstats`',
                })
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(commandEmbed)
            return
        } else if (args[0] === 'server') {
            const serverEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
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
                .setColor('#9f5000')
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
                .setColor('#9f5000')
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
        } else {
            const infoEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Help navigation:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Add one of the following options as an arguement.')
                .setThumbnail(message.client.user.avatarURL())
                .addFields({
                    name: 'Options: ',
                    value: '\`version\` \`commands\` \`server\` \`support\` \`riola\`'
                })
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(infoEmbed)
            return
        }
    }
}
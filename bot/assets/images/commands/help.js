const Discord = require("discord.js")
module.exports= {
    name: 'help',
    category: 'guides',
    description: 'commands',
    run: async(message, args, client) => {
        if (args[0] === 'ban') {
            const ban = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Ban command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: ban a server member\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?ban <mention user> [reason]`'},
                    { name: 'Output:', value: `Guineabot bans the mentioned user and logs information in \#g-modlog`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(ban)
            return
        } else if (args[0] === 'beep') {
            const beep = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Beep command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: for fun 😉\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?beep`'},
                    { name: 'Output:', value: `Guineabot replies with 'Boop 🤖'`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(beep)
            return
        } else if (args[0] === 'clear') {
            const clear = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Clear command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: delete bulk amounts of messages\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?clear <2-100>`'},
                    { name: 'Output:', value: `Guineabot deletes the amount of messages specified`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(clear)
            return
        } else if (args[0] === 'foo') {
            const foo = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Foo command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: for fun 😉\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?foo`'},
                    { name: 'Output:', value: `Guineabot responds with 'bar()'`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(foo)
            return
        } else if (args[0] === 'help') {
            message.channel.send('This command.')
            return
        } else if (args[0] === 'info') {
            const info = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Info command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: other information you can access\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?info`'},
                    { name: 'Output:', value: `Guineabot provides info based on the category`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(info)
            return
        } else if (args[0] === 'kick') {
            const kick = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Kick command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: kick a server member\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?kick <mention user> [reason]`'},
                    { name: 'Output:', value: `Guineabot kicks the mentioned user and logs information in \#g-modlog`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(kick)
            return
        } else if (args[0] === 'mute') {
            const mute = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Mute command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: prevent a server member from chatting\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?mute <mention user> [reason]`'},
                    { name: 'Output:', value: `Guineabot mutes the mentioned user and logs information in \#g-modlog`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(mute)
            return
        } else if (args[0] === 'ping') {
            const ping = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Ping command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: displays how responsive GuineaBot is\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?ping`'},
                    { name: 'Output:', value: `Guineabot displays ping for both message latency and Discord API latency`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(ping)
            return
        } else if (args[0] === 'prefix') {
            const prefix = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Prefix command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: changes the characters needed before the messageto run GuineaBot commands\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?prefix <new prefix>`'},
                    { name: 'Output:', value: `Guineabot changes its prefix and now needs the new prefix to run a GuineaBot comamnd`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(prefix)
            return
        } else if (args[0] === 'setnick') {
            const setnick = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Setnick command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: changes a user\'s display name\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?setnick [mention user] <new nickname>'},
                    { name: 'Output:', value: `Guineabot changes the user\'s nickname and logs information in \#g-modlog`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(setnick)
            return
        } else if (args[0] === 'setprefix') {
            const setprefix = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Setprefix command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: changes the characters needed before the message to run GuineaBot commands\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?setprefix <new prefix>`'},
                    { name: 'Output:', value: `Guineabot changes its prefix and now needs the new prefix to run a GuineaBot comamnd`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(setprefix)
            return
        } else if (args[0] === 'setup') {
            const setup = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Setup command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: a one-time command which generates required values the bot needs\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?setup`'},
                    { name: 'Output:', value: `Guineabot generates the values`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(setup)
            return
        } else if (args[0] === 'unban') {
            const unban = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unban command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: allows a banned member to rejoin the server\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?unban <mention member> [reason]`'},
                    { name: 'Output:', value: `Guineabot unbans the user and logs information in \#g-modlog`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(unban)
            return
        } else if (args[0] === 'unmute') {
            const unmute = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unmute command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: allows a muted user to chat again\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?unmute <mention user> [reason]`'},
                    { name: 'Output:', value: `Guineabot unmutes the user and logs information in \#g-modlog`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(unmute)
            return
        } else if (args[0] === 'vmute') {
            const vmute = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Vmute command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: prevent a server member from connecting to voice channels\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?vmute <mention user> [reason]`'},
                    { name: 'Output:', value: `Guineabot vmutes the member`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(vmute)
            return
        } else if (args[0] === 'unvmute'){
            const unvmute = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Unvmute command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: allows a server member to connect to voice channels again\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?prefix <mention member> [reason]`'},
                    { name: 'Output:', value: `Guineabot unvmutes the member`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(unvmute)
            return
        } else if (args[0] === 'wheek') {
            const wheek = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Wheek command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: for fun 😉\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?wheek`'},
                    { name: 'Output:', value: `Guineabot responds with 'Wheeeeeeeeeek! 🐹'`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(wheek)
            return
        } else if (args[0] === 'points') {
            const points = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Points command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: display points\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?points`'},
                    { name: 'Output:', value: `GuineaBot fetches points earned and displays it.`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(points)
            return
        } else if (args[0] === 'level') {
            const level = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Level command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: display points\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?Level`'},
                    { name: 'Output:', value: `GuineaBot fetches level and displays it.`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(level)
            return
        } else if (args[0] === 'leaderboard') {
            const leaderboard = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Leaderboard command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: display points\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?leaderboard`'},
                    { name: 'Output:', value: `GuineaBot fetches top 10 most active users`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(leaderboard)
            return
        } else if (args[0] === 'give') {
            const give = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Give command help:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Usage: give points\n*<> parameters are required, [] parameters are optional.*')
                .addFields(
                    { name: 'Input:', value: '`g?give <mention or ID> <amount>`'},
                    { name: 'Output:', value: `GuineaBot gives specified points to the mention`}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(give)
            return
        }

        if (!args[0]) {
            const nocmd = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Invalid command')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('State the command name you want help with.')
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(nocmd)
            return
        }
    }
}
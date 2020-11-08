const Discord = require("discord.js")
module.exports= {
    name: 'info',
    category: 'guides',
    description: 'All the information you need about GuineaBot',
    run: async(message, args, client) => {
        if(args[0] === 'version') {
            
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
        }else if(args[0] === 'commands'){
            const commandEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Commands')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Available GuineaBot commands:')
                .addFields(
                    { name: "Bot Owner ", value: "`kill`"},
                    { name: 'Owner', value: '`setup`' },
                    { name: 'Server Management', value: "`createtextchannel (ctc) | deletetextchannel (dtc)`\n`createvoicechannel (cvc) | deletevoicechannel (dvc)`"},
                    { name: 'Moderation', value: '`chatmute (cmute, cm) | unchatmute (uchatmute, ucmute, ucm)`\n`voicemute (vmute, vm) | unvoicemute (unvmute, uvmute, uvm)`\n`deafen (deaf, d) | undeafen (undeaf, ud)`\n`ban | unban (uban, ub)`\n`clear`\n`kick`\n`prefix | setprefix`\n`setnick`' },
                    { name: 'Music', value: '`loop`\n`lyrics`\n`nowplaying (np)`\n`pause`\n`play (p)`\n`playlist (pl)`\n`pruning`\n`queue (q)`\n`remove`\n`resume`\n`search`\n`shuffle`\n`skip (sk)`\n`stop`\n`skipto (skt, st)`\n`volume (v)`\n`join (connect)`\n`disconnect (dc)`' },
                    { name: 'Leveling', value: '`points (pts) | level (lvl)`\n`give`\n`leaderboard (lb)`'},
                    { name: 'Fun', value: '`beep`\n`foo`\n`wheek`\n`image (i)`\n`guineapig (gpig, piggy)`\n`randomnumber (rn)`\n`randomnumberrange (rnr)`\n`8ball`]\n`code (c)' },
                    { name: "Image generation", value: "`abandon`\n`aborted`\n`affect`\n`airpods`\n"},
                    { name: 'Info', value: '`info`\n`help (currently disabled)`\n`ping`'}
                )
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(commandEmbed)
            return
        }else if(args[0] === 'server'){
            const serverEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Servers')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setThumbnail(message.client.user.avatarURL())
                .addFields(
                    { name: 'Official GuineaBot server: ', value: 'Coming soon!'}
                )
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(serverEmbed)
            return
        }else if(args[0] === 'support'){
            const supportEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Found a bug?')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Contact Cy1der! The creator of this bot.')
                .setThumbnail(message.client.user.avatarURL())
                .addFields(
                    { name: 'DM Cy1der: ', value: 'Just DM him at **${Cy1der}#0001**.'},
                    { name: 'Email: ', value: 'Give him an email at **mrvenomousgd@gmail.com**'}
                )
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(supportEmbed)
            return
        }else{
            const infoEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Help navigation:')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Add one of the following options as an arguement.')
                .setThumbnail(message.client.user.avatarURL())
                .addFields(
                    { name: 'Options: ', value: '\`version\` \`commands\` \`server\` \`support\`'}
                )
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(infoEmbed)
            return
        }
    }
}
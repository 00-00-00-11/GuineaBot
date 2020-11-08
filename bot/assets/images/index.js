//https://discord.com/oauth2/authorize?client_id=745047221099036724&scope=bot&permissions=2146958847 alpha
//https://discord.com/oauth2/authorize?client_id=727288620221857843&scope=bot&permissions=2146958847
const fs = require("fs")
const Discord = require('discord.js');
const client = new Discord.Client({disableMentions: "everyone"});
const { PREFIX } = require('./config.json')
const db = require('quick.db')
require('dotenv-flow').config()
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const { join } = require("path");



//   _______ ___ ___ ______       ___ ___                __ __            
// |   _   |   Y   |   _  \     |   Y   .---.-.-----.--|  |  .-----.----.
// |.  1___|.      |.  |   \    |.  1   |  _  |     |  _  |  |  -__|   _|
// |.  |___|. \_/  |.  |    \   |.  _   |___._|__|__|_____|__|_____|__|  
// |:  1   |:  |   |:  1    /   |:  |   |                                
// |::.. . |::.|:. |::.. . /    |::.|:. |                                
// `-------`--- ---`------'     `--- ---'                                


client.commands = new Discord.Collection()
client.queue = new Map()
client.prefix = PREFIX
const cooldowns = new Discord.Collection()
//const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const commandFiles = fs.readdirSync(join(__dirname, 'commands')).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(join(__dirname, 'commands', `${file}`))
    client.commands.set(command.name, command)
}

const config = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX
}

client.on('disconnect', () => {
    console.log('Disconnect')
})

client.on("warn", (info) => console.log(info))
client.on("error", console.error)

client.on('message', async (message) => {
    if (message.author.bot) return
    if (message.channel.type === "dm") return;
    let score;
    if (message.guild) {
        score = client.getScore.get(message.author.id, message.guild.id)
        if (!score) {
            score = {
                id: `${message.guild.id} - ${message.author.id}`,
                user: message.author.id,
                guild: message.guild.id,
                points: 0,
                level: 1
            }
        }
        score.points++

        const curLevel = Math.floor(0.1 * Math.sqrt(score.points))

        if (score.level < curLevel) {
            score.level++
            message.reply(`GG! You leveled up to **${curLevel}**!`)
        }

        client.setScore.run(score)
    }
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) {
        prefix = PREFIX;
    }

    //const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`)
    //if (!prefixRegex.test(message.content)) return;

    //const [, matchedPrefix] = message.content.match(prefixRegex)

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 1) * 1000

    if (timestamps.has(command.name)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000
            return message.reply(
                `Please wait ${timeLeft.toFixed(1)} more second(s) befure using the \`${command.name}\` command.`
            )
        }
    }

    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

    /*
    setup (MANDATORY!!!)
    chatmute (cmute, cm) | unchatmute (uchatmute, ucmute, ucm)
    voicemute (vmute, vm) | unvoicemute (unvmute, uvmute, uvm)
    deafen (deaf, d) | undeafen (undeaf, ud)
    beep | foo | wheek
    ping
    info | help
    ban | unban (uban, ub)
    clear
    kick
    prefix | setprefix
    setnick
    points (pts) | level (lvl)
    give
    leaderboard (lb)
    loop
    lyrics
    nowplaying (np)
    pause
    play (p)
    playlist (pl)
    pruning
    queue (q)
    remove
    resume
    search
    shuffle
    skip (sk)
    stop
    skipto (skt, st)
    volume (v)
    join (connect) | disconnect (dc)
    guineapig (gpig, piggy)
    image (i)
    createtextchannel (ctc) | deletetextchannel (dtc)
    createvoicechannel (cvc) | deletevoicechannel (dvc)
    kill
    randomnumber (rn)
    randomnumberrange (rnr)
    code (c)
    abandon
    affect
    aborted
    airpods
    */
    if (command === 'setup') {
        client.commands.get('setup').run(message, args)
    } else if (command === 'beep') {
        client.commands.get('beep').run(message, args)
    } else if (command === 'foo') {
        client.commands.get('foo').run(message, args)
    } else if (command === 'ping') {
        client.commands.get('ping').run(message, args)
    } else if (command === 'wheek') {
        client.commands.get('wheek').run(message, args)
/*    } else if (command === 'help') {
        client.commands.get('help').run(message, args)
*/    } else if (command === 'info') {
        client.commands.get('info').run(message, args)
    } else if (command === 'ban') {
        client.commands.get('ban').run(message, args)
    } else if (command === 'clear') {
        client.commands.get('clear').run(message, args)
    } else if (command === 'kick') {
        client.commands.get('kick').run(message, args)
    } else if (command === 'chatmute' || command === "cmute" || command === "cm") {
        client.commands.get('chatmute').run(message, args)
    } else if (command === 'prefix') {
        client.commands.get('prefix').run(message, args)
    } else if (command === 'setnick') {
        client.commands.get('setnick').run(message, args)
    } else if (command === 'setprefix') {
        client.commands.get('setprefix').run(message, args)
    } else if (command === 'unban' || command === "uban" || command === "ub") {
        client.commands.get('unban').run(message, args)
    } else if (command === 'unchatmute' || command === "uchatmute" || command === "ucmute" || command === "ucm") {
        client.commands.get('unchatmute').run(message, args)
    } else if (command === 'unvoicemute' || command === "unvmute" || command === "uvmute" || command === "uvm") {
        client.commands.get('unvoicemute').run(message, args)
    } else if (command === 'voicemute' || command === "vmute" || command === "vm") {
        client.commands.get('voicemute').run(message, args)
    } else if (command === 'points' || command === "pts") {
        return message.reply(`You have **${score.points}** points.\nYou are level **${score.level}**`)
    } else if (command === 'level' || command === "lvl") {
        if (args[0]) return
        return message.reply(`You have **${score.points}** points.\nYou are level **${score.level}**`)
    } else if (command === 'give') {
        if (!message.member.hasPermission("ADMINISTRATOR", explicit = true)) {
            const permsss = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Give unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("You don't have the correct permissions.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(permsss)
            return
        }
        const usergive = message.mentions.users.first() || client.users.cache.get(args[0])
        if (!usergive) {
            const noargs = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Give unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("Mention a member or provide their ID.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(noargs)
            return
        }

        const pointstoadd = parseInt(args[1], 10)
        if (!pointstoadd) {
            const pointsn0 = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Give unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("Provide how many points to add.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(pointsn0)
            return
        }

        let userscore = client.getScore.get(usergive.id, message.guild.id)
        if (!userscore) {
            userscore = { 
                id: `${message.guild.id}-${usergive.id}`, 
                user: usergive.id, guild: message.guild.id, 
                points: 0, 
                level: 1 
            }
        }
        userscore.points += pointstoadd

        let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
        userscore.level = userLevel;
        client.setScore.run(userscore);

        return message.channel.send(`${usergive.tag} has received ${pointstoadd} points and now stands at ${userscore.points} points.`);
    } else if (command === 'leaderboard' || command === "lb") {
        const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id)

        const top10embed = new Discord.MessageEmbed()
        .setColor('#9f5000')
        .setTitle('Points leaderboard')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription("Top 10 highest points in this server")
        .setThumbnail(message.client.user.avatarURL())
        .setTimestamp()
        .setFooter('Thank you for using GuineaBot!')

        for (const data of top10) {
            console.log(data.user)
            let namelb = client.users.cache.get(data.user)
            top10embed.addFields({
                name: namelb.tag,
                value: `${data.points} points (level ${data.level})`
            })
        }

        if (top10.length < 10) {
            message.channel.send(`Insufficient activity, need at least 10 different members with at least 1 point.\nCurrently only ${top10.length} members have points.`)
            return
        }

        return message.channel.send(top10embed);
    } else if (command === 'loop') {
        client.commands.get("loop").run(message, args)
    } else if (command === 'lyrics') {
        client.commands.get("lyrics").run(message, args)
    } else if (command === 'nowplaying' || command === "np") {
        client.commands.get("nowplaying").run(message, args)
    } else if (command === 'pause') {
        client.commands.get("pause").run(message, args)
    } else if (command === 'play' || command === "p") {
        client.commands.get("play").run(message, args)
    } else if (command === 'playlist' || command === "pl") {
        client.commands.get("playlist").run(message, args)
    } else if (command === 'pruning') {
        client.commands.get("pruning").run(message, args)
    } else if (command === 'queue' || command === "q") {
        client.commands.get("queue").run(message, args)
    } else if (command === 'remove') {
        client.commands.get("remove").run(message, args)
    } else if (command === 'resume') {
        client.commands.get("resume").run(message, args)
    } else if (command === 'search') {
        client.commands.get("search").run(message, args)
    } else if (command === 'shuffle') {
        client.commands.get("shuffle").run(message, args)
    } else if (command === 'skip' || command === "sk") {
        client.commands.get("skip").run(message, args)
    } else if (command === 'stop') {
        client.commands.get("stop").run(message, args)
    } else if (command === 'skipto' || command === "skt" || command === "st") {
        client.commands.get("skipto").run(message, args)
    } else if (command === 'volume' || command === "v") {
        client.commands.get("volume").run(message, args)
    } else if (command === "join" || command === "connect") {
        const channel = message.member.voice.channel
        if (!channel) return message.channel.send("You need to be in a voice channel first!").catch(console.error);
        if (message.guild.me.voice.channel) return message.channel.send("I'm already connected to a voice channel.")
        message.member.voice.channel.join()
        message.channel.send(`Successfully joined **${message.member.voice.channel.name}**`)
        return
    } else if (command === "disconnect" || command === "dc") {
        const channel = message.member.voice.channel
        if (!channel) return message.channel.send("You need to be in a voice channel first!").catch(console.error);
        if (!message.guild.me.voice.channel) return message.channel.send("I'm not connected to a voice channel.")
        message.guild.me.voice.channel.leave()
        message.channel.send(`Successfully left **${message.member.voice.channel.name}**`)
        return
    } else if (command === "deafen" || command == "deaf" || command === "d") {
        client.commands.get("deafen").run(message, args)
    } else if (command === "undeafen" || command === "undeaf" || command === "ud") {
        client.commands.get("undeafen").run(message, args)
    } else if (command === "guineapig" || command === "gpig" || command === "piggy") {
        client.commands.get("guineapig").run(message, args)
    } else if (command === "image" || command === "i") {
        client.commands.get("image").run(message, args)
    } else if (command === 'createtextchannel' || command === "ctc") {
        client.commands.get("createtextchannel").run(message, args)
    } else if (command === 'createvoicechannel' || command === "cvc") {
        client.commands.get("createvoicechannel").run(message, args)
    } else if (command === 'deletetextchannel' || command === "dtc") {
        client.commands.get("deletetextchannel").run(message, args)
    } else if (command === 'deletevoicechannel' || command === "dvc") {
        client.commands.get("deletevoicechannel").run(message, args)
    } else if (command === 'kill') {
        client.commands.get("kill").run(message, args)
    } else if (command === 'randomnumber' || command === "rn") {
        client.commands.get("randomnumber").run(message, args)
    } else if (command === 'randomnumberrange' || command === "rnr") {
        client.commands.get("rnr").run(message, args)
    } else if (command === '8ball') {
        client.commands.get("8ball").run(message, args)
    } else if (command === 'code' || command === 'c') {
        client.commands.get("code").run(message, args)
    } else if (command === 'abandon') {
        client.commands.get("abandon").run(message, args)
    } else if (command === 'aborted') {
        client.commands.get("aborted").run(message, args)
    } else if (command === 'affect') {
        client.commands.get("affected").run(message, args)
    } else if (command === 'airpods') {
        client.commands.get("airpods").run(message, args)
    } else {
        message.channel.send('Invalid command')
    }

    console.log(message.channel.type)
})

client.on('guildCreate', async joinedGuild => {
    await joinedGuild.channels.create('read-me', {type: 'text'})
    let readme = joinedGuild.channels.cache.find(channel => channel.name === "read-me")
    const readmeEmbed = new Discord.MessageEmbed()
        .setColor('#9f5000')
        .setTitle('Read before using GuineaBot')
        .setDescription("**Before you use me please do the following or I will not work properly:\n**\n¬ @everyone should **NOT** have `send messages` enabled\n¬ Do not modify the permissions I generated for myself or I will **NOT** work properly\n¬ Perform `g?setup`\n¬ The higher my role is, the better the `chatmute` command will work")
        .setThumbnail(client.user.avatarURL())
        .setTimestamp()
        .setFooter('Thank you for inviting GuineaBot!')
    readme.send(readmeEmbed)
    client.user.setActivity(client.guilds.cache.size + ' servers', {type: 'WATCHING'}).catch(console.error);
})

client.on('guildDelete', async deleteGuild => {
    client.user.setActivity(client.guilds.cache.size + ' servers', {type: 'WATCHING'}).catch(console.error);
})

client.once('ready', () => {
    console.log("[GuineaBot] Ready                                                                                           wheek wheek");
    client.user.setActivity(client.guilds.cache.size + ' servers', {type: 'WATCHING'}).catch(console.error);
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get()
    if (!table['count(*)']) {
        sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run()
        sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run()
        sql.pragma("synchronous = 1")
        sql.pragma("journal_mode = wal")
    }
    client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
    client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
})

client.login(config.token);

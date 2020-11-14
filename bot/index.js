//https://discord.com/oauth2/authorize?client_id=745047221099036724&scope=bot&permissions=2146958847 alpha
//https://discord.com/oauth2/authorize?client_id=727288620221857843&scope=bot&permissions=2146958847
const fs = require("fs")
const Discord = require('discord.js');
const client = new Discord.Client({
    disableMentions: "everyone"
});
const {
    PREFIX
} = require('./config.json')
const db = require('quick.db')
require('dotenv-flow').config()
const ascii = require("ascii-table")
const fetch = require("node-fetch");
const {
    setInterval
} = require("timers");
const discordXP = require("discord-xp");
const mongo = require("./mongo")

discordXP.setURL(`${process.env.MONGODB_DATABASE}`)

async () => {
    await mongo()
}

let table = new ascii("Commands")
table.setHeading("Command", "Load Status")

client.commands = new Discord.Collection()

fs.readdirSync("./commands/").forEach(dir => {
    const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'))
    for (let file of commands) {
        let pull = require(`./commands/${dir}/${file}`)
        if (pull.name) {
            client.commands.set(pull.name, pull)
            table.addRow(file, `Yes`)
        } else {
            continue
        }
        if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
    }
})
console.log(table.toString())

client.queue = new Map()
client.prefix = PREFIX

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
    if (!message.guild) return;

    let earnedXP = Math.floor(Math.random() * 9) + 1
    let hasLeveledUp = await discordXP.appendXp(message.author.id, message.guild.id, earnedXP)

    if (hasLeveledUp) {
        let XPuser = await discordXP.fetch(message.author.id, message.guild.id)
        message.reply(`GG! You leveled up to level **${XPuser.level}**!`)
    }

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) {
        prefix = PREFIX;
    }

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    message.channel.startTyping(true)

    //help disabled
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
    } else if (command === 'info') {
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
    } else if (command === 'unban' || command === "uban" || command === "ub") {
        client.commands.get('unban').run(message, args)
    } else if (command === 'unchatmute' || command === "uchatmute" || command === "ucmute" || command === "ucm") {
        client.commands.get('unchatmute').run(message, args)
    } else if (command === 'unvoicemute' || command === "unvmute" || command === "uvmute" || command === "uvm") {
        client.commands.get('unvoicemute').run(message, args)
    } else if (command === 'voicemute' || command === "vmute" || command === "vm") {
        client.commands.get('voicemute').run(message, args)
    } else if (command === 'loop') {
        client.commands.get("loop").run(message, args)
    } else if (command === 'lyrics' || command === "ly") {
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
        client.commands.get("connect").run(message, args)
    } else if (command === "disconnect" || command === "dc") {
        client.commands.get("disconnect").run(message, args)
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
    } else if (command === 'dankmeme' || command === "dmeme" || command == "dm") {
        client.commands.get("dankmeme").run(message, args)
    } else if (command === 'cmd') {
        client.commands.get("cmd").run(message, args)
    } else if (command === 'binary') {
        client.commands.get("binary").run(message, args)
    } else if (command === 'urban') {
        client.commands.get("urban").run(message, args)
    } else if (command === 'google') {
        client.commands.get("google").run(message, args)
    } else if (command === 'spotify') {
        client.commands.get("spotify").run(message, args)
    } else if (command === 'weather') {
        client.commands.get("weather").run(message, args)
    } else if (command === 'wholesomememe' || command === "wmeme" || command == "wm") {
        client.commands.get("wholesomememe").run(message, args)
    } else if (command === "stats") {
        client.commands.get("stats").run(message, args)
    } else if (command === "america") {
        client.commands.get("america").run(message, args)
    } else if (command === "armor") {
        client.commands.get("armor").run(message, args)
    } else if (command === "balloon") {
        client.commands.get("balloon").run(message, args)
    } else if (command === "banfilth") {
        client.commands.get("banfilth").run(message, args)
    } else if (command === "slap") {
        client.commands.get("slap").run(message, args)
    } else if (command === "avatar") {
        client.commands.get("avatar").run(message, args)
    } else if (command === "bed") {
        client.commands.get("bed").run(message, args)
    } else if (command === "bongocat") {
        client.commands.get("bongocat").run(message, args)
    } else if (command === "boo") {
        client.commands.get("boo").run(message, args)
    } else if (command === "edgedetect") {
        client.commands.get("edgedetect").run(message, args)
    } else if (command === "emboss") {
        client.commands.get("emboss").run(message, args)
    } else if (command === "blur") {
        client.commands.get("blur").run(message, args)
    } else if (command === "sobel") {
        client.commands.get("sobel").run(message, args)
    } else if (command === "outline") {
        client.commands.get("outline").run(message, args)
    } else if (command === "sharpen") {
        client.commands.get("sharpen").run(message, args)
    } else if (command === "findnose") {
        client.commands.get("findnose").run(message, args)
    } else if (command === "rank" || command === "points" || command === "pts" || command === "level" || command === "lvl") {
        client.commands.get("rank").run(message, args)
    } else if (command === "leaderboard" || command === "lb") {
        client.commands.get("leaderboard").run(message, args)
    } else if (command === "required") {
        client.commands.get("required").run(message, args)
    } else if (command === "createuserxp") {
        client.commands.get("createuserxp").run(message, args)
    } else if (command === "deleteuserxp") {
        client.commands.get("deleteuserxp").run(message, args)
    } else if (command === "addxp") {
        client.commands.get("addxp").run(message, args)
    } else if (command === "removexp") {
        client.commands.get("removexp").run(message, args)
    } else if (command === "addlevel") {
        client.commands.get("addlevel").run(message, args)
    } else if (command === "removelevel") {
        client.commands.get("removelevel").run(message, args)
    } else if (command === "setxp") {
        client.commands.get("setxp").run(message, args)
    } else if (command === "setlevel") {
        client.commands.get("setlevel").run(message, args)
    } else if (command === "serverstats") {
        client.commands.get("serverstats").run(message, args)
    } else if (command === "calc") {
        client.commands.get("calc").run(message, args)
    } else if (command === "ascii") {
        client.commands.get("ascii").run(message, args)
    } else if (command === "anonymous") {
        client.commands.get("anonymous").run(message, args)
    } else if (command === "brain") {
        client.commands.get("brain").run(message, args)
    } else if (command === "byemom") {
        client.commands.get("byemom").run(message, args)
    } else if (command === "coolkid") {
        client.commands.get("coolkid").run(message, args)
    } else if (command === "debate") {
        client.commands.get("debate").run(message, args)
    } else if (command === "warn") {
        client.commands.get("warn").run(message, args)
    } else if (command === "warnings") {
        client.commands.get("warnings").run(message, args)
    } else if (command === "removewarn") {
        client.commands.get("removewarn").run(message, args)
    } else if (command === "sarcastic") {
        client.commands.get("sarcastic").run(message, args)
    } else if (command === "snake") {
        client.commands.get("snake").run(message, args)
    } else if (command === "minesweeper") {
        client.commands.get("minesweeper").run(message, args)
    } else if (command === "simp") {
        client.commands.get("simp").run(message, args)
    } else if (command === "gamer") {
        client.commands.get("gamer").run(message, args)
    } else if (command === "cleverbot") {
        client.commands.get("cleverbot").run(message, args)
    } else if (command === "rps") {
        client.commands.get("rps").run(message, args)
    } else if (command === "guessnum") {
        client.commands.get("guessnum").run(message, args)
    } else if (command === "connect4") {
        client.commands.get("connect4").run(message, args, client)
    } else if (command === "hangman") {
        client.commands.get("hangman").run(message, args, client)
    } else if (command === "chess") {
        client.commands.get("chess").run(message, args, client)
    } else if (command === "tictactoe") {
        client.commands.get("tictactoe").run(message, args, client, prefix, command)
    } else if (command === "temporary") {
        client.commands.get("temporary").run(message, args)
    } else if (command === "deepfry") {
        client.commands.get("deepfry").run(message, args)
    } else if (command === "fisheye") {
        client.commands.get("fisheye").run(message, args)
    } else {
        message.channel.send(`Invalid command. Perform \`${prefix}info commands\` to see all available commands.`)
    }

    message.channel.stopTyping(true)
})

client.on('guildCreate', async joinedGuild => {
    await joinedGuild.channels.create('read-me', {
        type: 'text'
    })
    let readme = joinedGuild.channels.cache.find(channel => channel.name === "read-me")
    const readmeEmbed = new Discord.MessageEmbed()
        .setColor('#9f5000')
        .setTitle('Read before using GuineaBot')
        .setDescription("**Before you use me please do the following or I will not work properly:\n**\n¬ @everyone should **NOT** have `send messages` enabled\n¬ Do not modify the permissions I generated for myself or I will **NOT** work properly\n¬ Perform `g?setup`\n¬ The higher my role is, the better the `chatmute` command will work")
        .setThumbnail(client.user.avatarURL())
        .setTimestamp()
        .setFooter('Thank you for inviting GuineaBot!')
    readme.send(readmeEmbed)
})

client.once('ready', () => {
    fetch("https://api.ipify.org/?format=json").then(results => results.json()).then(data => console.log(`Server IP: ${data.ip}`))
    console.log("[GuineaBot] Ready                                                                                           wheek wheek");

    let activityList = [
        "with some code",
        "with the dev console",
        `with ${client.guilds.cache.size} servers`,
        "Minecraft Fortnite mod 2020 nOt CliCkBaIt",
        "absolutely nothing",
        "Discord mod simulator"
    ]

    const randS = Math.floor(Math.random() * (activityList.length - 1) + 1)
    client.user.setActivity(activityList[randS], {
        type: 'PLAYING'
    }).catch(console.error);

    setInterval(function () {
        const index = Math.floor(Math.random() * activityList.length)
        client.user.setActivity(activityList[index], {
            type: 'PLAYING'
        }).catch(console.error);
    }, 60000)
})

client.login(config.token);
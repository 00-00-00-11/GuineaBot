// ? https://discord.com/oauth2/authorize?client_id=745047221099036724&scope=bot&permissions=2146958847 alpha
// ! https://discord.com/oauth2/authorize?client_id=727288620221857843&scope=bot&permissions=2146958847

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

client.on("warn", info => console.log(info))
client.on("error", error => console.log(error))

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

    let commands = ["setup", "beep", "foo", "ping", "wheek", "info", "ban", "clear", "kick", "chatmute", "prefix", "setnick", "unban", "unchatmute", "unvoicemute", "voicemute", "loop", "lyric", "nowplaying", "pause", "play", "playlist", "pruning", "queue", "remove", "resume", "search", "shuffle", "skip", "stop", "skipto", "volume", "connect", "disconnect", "deafen", "undeafen", "guineapig", "image", "createtextchannel", "createvoicechannel", "deletetextchannel", "deletevoicechannel", "kill", "randomnumber", "randomnumberrange", "8ball", "code", "abandon", "aborted", "airpods", "affect", "dankmeme", "cmd", "binary", "urban", "google", "spotify", "weather", "wholesomememe", "stats", "america", "armor", "balloon", "banfilth", "slap", "avatar", "bed", "bongocat", "boo", "edgedetect", "emboss", "blur", "sobel", "outline", "sharpen", "findnose", "rank", "leaderboard", "required", "createuserxp", "deleteuserxp", "addxp", "removexp", "addlevel", "removelevel", "setxp", "setlevel", "serverstats", "calc", "ascii", "anonymous", "brain", "byemom", "coolkid", "debate", "warn", "warnings", "removewarn", "sarcastic", "snake", "minesweeper", "simp", "gamer", "cleverbot", "rps", "guessnum", "connect4", "hangman", "chess", "tictactoe", "temporary", "deepfry", "fisheye", "hex"];

    message.channel.startTyping(true)

    if (commands.includes(command.toLowerCase())) {
        try {
            client.commands.get(command).run(message, args, client, prefix, command)
        } catch (err) {
            console.log(err)
            message.channel.stopTyping()
            message.channel.send(`An error has occured while trying to run the ${command.toLowerCase()} command: \`\`\`${err.message}\`\`\``)
        }
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
    fetch("https://api.ipify.org/?format=json").then(results => results.json()).then(data => console.log(`Logged in as [${client.user.tag}]\nServer IP: ${data.ip}`))

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
    }).catch(error => console.log(error));

    setInterval(function () {
        const index = Math.floor(Math.random() * activityList.length)
        client.user.setActivity(activityList[index], {
            type: 'PLAYING'
        }).catch(error => console.log(error));
    }, 60000)
})

client.login(config.token);
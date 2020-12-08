// ? https://discord.com/oauth2/authorize?client_id=745047221099036724&scope=bot&permissions=2146958847 alpha
// ! https://discord.com/oauth2/authorize?client_id=727288620221857843&scope=bot&permissions=2146958847

//Initiate dependencies required to run index.js and create a new client
const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const fetch = require("node-fetch");
const WOKCommands = require("wokcommands");
const discordXP = require("discord-xp");
const cleverbot = require("cleverbot-free");

//Hide sensitive information from the public using dotenv-flow, all the "passwords" are stored in a file named ".env" located in the root directory
require('dotenv-flow').config()

//Instead of writing process.env every time you have to declare a password, I declared them all in an object
const config = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    ytapikey: process.env.YOUTUBE_API_KEY,
    soundcloudClientid: process.env.SOUNDCLOUD_CLIENT_ID,
    googleapikey: process.env.GOOGLE_API_KEY,
    mongodb: process.env.MONGODB_DATABASE
}

discordXP.setURL(`${config.mongodb}`)

//This is required so the music commands work properly
client.queue = new Map()

// TODO: Moderation, spotify support, spotify playlist print, messages.json for every message sent

let recentMsg = new Set();

client.on('ready', async () => {
    //Initiate the command handler and many more features including a prebuilt prefix command, all data is stored in mongoDB
    new WOKCommands(client, "commands", "listeners", "messages.json")
        .setMongoPath(`${config.mongodb}`)
        .setDefaultPrefix("g?")
        .setDisplayName("Guineabot")
        .setColor("RANDOM")
        .setCategoryEmoji("Bot Owner", "🤖")
        .setCategoryEmoji("Fun", "😂")
        .setCategoryEmoji("Games", "🎮")
        .setCategoryEmoji("Economy", "💸")
        .setCategoryEmoji("Server Owner", "👑")
        .setCategoryEmoji("Images", "📷")
        .setCategoryEmoji("Information", "ℹ")
        .setCategoryEmoji("Leveling", "🌀")
        .setCategoryEmoji("Moderation", "🔨")
        .setCategoryEmoji("Music", "🎶")
        .setCategoryEmoji("Riola", "🐦")
        .setCategoryEmoji("Server Management", "⚡")
        .setCategoryEmoji("Stocks", "📈")
        .setCategoryEmoji("Utility", "🧠")

    client.user.setPresence({
        activity: {
            name: `g?help | ${client.guilds.cache.size} servers`,
            type: "STREAMING",
            url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, //get noobed
        },
        status: "online"
    })

    //Fetch the server's IP address, this is optional
    fetch("https://api.ipify.org/?format=json").then(results => results.json()).then(data => console.log(`Logged in as [${client.user.tag}]\nServer IP: ${data.ip}`))
})

client.on("message", async (message) => {
    //Check if the person who sent the message is registered as a Discord Bot
    if (message.author.id === client.user.id || message.author.bot) return

    //Bot commands only work in servers, so add this to prevent permission errors originating from the DM
    if (!message.guild) return cleverbot(message.content).then(response => message.channel.send(response));

    //Points system
    if (recentMsg.has(message.author.id)) return
    else {
        recentMsg.add(message.author.id)

        //Generates a random amount of points to add to the member, and adds it to the database
        let earnedXP = Math.floor(Math.random() * 9) + 1
        let hasLeveledUp = await discordXP.appendXp(message.author.id, message.guild.id, earnedXP)

        //Checks if the user leveled up, and notify the member
        if (hasLeveledUp) {
            let XPuser = await discordXP.fetch(message.author.id, message.guild.id)
            message.reply(`GG! You leveled up to level **${XPuser.level}**!`)
        }

        setTimeout(() => {
            // Removes the user from the set after a minute
            recentMsg.delete(message.author.id);
        }, 45000);
    }
})

//Lastly, login to Discord and start spamming commands!
client.login(config.token);
// ? https://discord.com/oauth2/authorize?client_id=745047221099036724&scope=bot&permissions=2146958847 alpha
// ! https://discord.com/oauth2/authorize?client_id=727288620221857843&scope=bot&permissions=2146958847

const fetch = require("node-fetch");
const WOKCommands = require("wokcommands");
const discordXP = require("discord-xp");
const cleverbot = require("cleverbot-free");
const { GiveawayCreator, DropCreator } = require("discord-giveaway")

//Initiate dependencies required to run index.js and create a new client
const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    retryLimit: 1,
    restSweepInterval: 60,
    restRequestTimeout: 15000,
    restTimeOffset: 500,
    restWsBridgeTimeout: 5000,
    fetchAllMembers: false,
    messageEditHistoryMaxSize: -1,
    messageSweepInterval: 0,
    messageCacheLifetime: 0,
    messageCacheMaxSize: 200,
    http: {
        version: 7,
        api: "https://discord.com/api",
        cdn: "https://cdn.discordapp.com",
        invite: "https://discord.gg",
        template: "https://discord.new"
    },
});

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
const Creator = new GiveawayCreator(client, config.mongodb)
const Creator2 = new DropCreator(client, config.mongodb)

client.queue = new Map()
client.giveaways = Creator
client.drops = Creator2

let recentMsg = new Set();

// TODO: messages.json for every message sent, item usage for economy, listeners

client.on('ready', async () => {
    //Initiate the command handler and many more features including a prebuilt prefix command, all data is stored in mongoDB
    new WOKCommands(client, "commands", "listeners", "messages.json")
        .setMongoPath(`${config.mongodb}`)
        .setDefaultPrefix("g?")
        .setDisplayName("Guineabot")
        .setDefaultLanguage("english")
        .setColor("RANDOM")
        .setBotOwner(config.owner)
        .setCategorySettings(
            [{
                    name: "Bot Owner",
                    emoji: "🤖",
                    hidden: true
                },
                {
                    name: "Fun & Games",
                    emoji: "🎮"
                },
                {
                    name: "Economy",
                    emoji: "💵"
                },
                {
                    name: "Moderation",
                    emoji: "🔨"
                },
                {
                    name: "Utility",
                    emoji: "🧠"
                },
                {
                    name: "Images",
                    emoji: "📸"
                },
                {
                    name: "Leveling",
                    emoji: "💬"
                },
                {
                    name: "Music",
                    emoji: "🎵"
                },
                {
                    name: "Information",
                    emoji: "ℹ"
                },
                {
                    name: "Giveaways",
                    emoji: "🎉"
                }
            ]
        )

    let serverText = "servers"
    if (client.guilds.cache.size === 1) serverText = "server"

    client.user.setPresence({
        activity: {
            name: `g?help | ${client.guilds.cache.size} ${serverText}`,
            type: "STREAMING",
            url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, //get noobed
        },
        status: "online"
    })

    console.log(`Logged in as [${client.user.tag}]`)
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
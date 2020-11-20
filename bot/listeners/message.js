const discordXP = require("discord-xp");

//Connects to the database, where all the points are stored
discordXP.setURL(`${process.env.MONGODB_DATABASE}`)

module.exports = (client) => {
    client.on('message', async (message) => {
        //Check if the person who sent the message is registered as a Discord Bot
        if (message.author.bot) return

        //Bot commands only work in servers, so add this to prevent permission errors originating from the DM
        if (!message.guild) return message.channel.send("I do not function in DM's, please use my commands in a server.");

        //Generates a random amount of points to add to the member, and adds it to the database
        let earnedXP = Math.floor(Math.random() * 9) + 1
        let hasLeveledUp = await discordXP.appendXp(message.author.id, message.guild.id, earnedXP)

        //Checks if the user leveled up, and notify the member
        if (hasLeveledUp) {
            let XPuser = await discordXP.fetch(message.author.id, message.guild.id)
            message.reply(`GG! You leveled up to level **${XPuser.level}**!`)
        }
    })
}
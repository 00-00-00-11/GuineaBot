const Discord = require("discord.js")

module.exports = (client) => {
    client.on("guildMemberUpdate", async (oldG, newG) => {
        let modlog = newG.channels.cache.find(channel => channel.name.includes("g-modlog"))
        if (!modlog) return

        const logEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Server Updated')
            .addFields({
                name: "Server Information:",
                value: `${newG.name} (${newG.id})`
            })
            .setTimestamp()
        modlog.send(logEmbed)
    })
}

module.exports.config = {
    displayName: "Server Update",
    dbName: "GBOTmod",
    loadDBFirst: true
}
const Discord = require("discord.js")
module.exports = (client) => {
    client.on("messageUpdate", (oldM, newM) => {
        if (newM.author.bot) return
        let modlog = newM.guild.channels.cache.find(channel => channel.name.includes("g-modlog"))
        if (!modlog) return

        const logEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Message Edited')
            .addFields({
                name: "Old Message:",
                value: oldM.content
            }, {
                name: "New Message:",
                value: newM.content
            }, {
                name: 'Message Sender:',
                value: `${newM.author.username}#${newM.author.discriminator} (${newM.author.id})`
            }, {
                name: "Channel:",
                value: `${newM.channel.name} (${newM.channel.id})`
            })
            .setTimestamp()
        modlog.send(logEmbed)
    })
}

module.exports.config = {
    displayName: "Message Update",
    dbName: "GBOTmod",
    loadDBFirst: true
}
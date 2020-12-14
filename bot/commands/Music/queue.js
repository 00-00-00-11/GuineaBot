const {
    MessageEmbed,
    escapeMarkdown
} = require("discord.js")

module.exports = {
    name: 'queue',
    aliases: ["q"],
    minArgs: 0,
    maxArgs: 0,
    description: "Music queue",
    category: "Music",
    run: async (message, args, text, client, prefix, instance) => {
        const queue = message.client.queue.get(message.guild.id)
        if (!queue) return message.reply("No song is being played right now.")

        let description = queue.songs.map((song, index) => `${index + 1}. ${escapeMarkdown(song.title)}`)
        let descriptionString = description.join("\n")

        if (descriptionString.length > 2048) {
            descriptionString = descriptionString.substring(0, 2045) + '...';
        }

        let queueEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Music queue')
            .setDescription(descriptionString)
            .setTimestamp()

        message.channel.send(queueEmbed)
    }
}
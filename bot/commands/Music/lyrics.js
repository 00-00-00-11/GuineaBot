const {
    MessageEmbed
} = require("discord.js")
const lyricsFinder = require("lyrics-finder")

module.exports = {
    name: "lyrics",
    aliases: [ "ly" ],
    minArgs: 0,
    maxArgs: 0,
    description: "Displays the lyrics of the current song",
    category: "Music",
    run: async (message, args, text, client, prefix, instance) => {
        const queue = message.client.queue.get(message.guild.id)
        if (!queue) return message.reply("No song is being played right now.")
        let lyrics = null

        try {
            lyrics = await lyricsFinder(queue.songs[0].title, "")
            if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`
        } catch (error) {
            lyrics = `No lyrics found for ${queue.songs[0].title}.`
        }

        if (lyrics.length > 2048) {
            lyrics = lyrics.substring(0, 2045) + '...';
        }

        let lyricsEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Lyrics')
            .setDescription(lyrics)
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')
        return message.channel.send(lyricsEmbed).catch(console.error)
    }
}
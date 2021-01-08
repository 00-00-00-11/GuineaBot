const {
    MessageEmbed
} = require("discord.js")
const lyricsFinder = require("lyrics-finder")
const genius = require("genius-lyrics-api")

module.exports = {
    name: "lyrics",
    aliases: ["ly"],
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: "[song name]",
    description: "Displays the lyrics of the current song",
    category: "Music",
    run: async ({
        message,
        args,
        text,
        client,
        prefix,
        instance
    }) => {
        let lyrics = ""

        if (args.length > 0) {
            let search = args.join(" ")

            let options = {
                apiKey: process.env.GENIOUS,
                title: search,
                artist: "",
                optimizeQuery: true
            }

            try {
                lyrics = await genius.getLyrics(options)
                if (!lyrics) lyrics = `No lyrics found for ${search}.`
            } catch (error) {
                lyrics = `No lyrics found for ${search}.`
            }
        } else {
            const queue = message.client.queue.get(message.guild.id)
            if (!queue) return message.reply("No song is being played right now.")

            let options = {
                apiKey: process.env.GENIOUS,
                title: queue.songs[0].title,
                artist: "",
                optimizeQuery: true
            }

            try {
                lyrics = await genius.getLyrics(options)
                if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`
            } catch (error) {
                lyrics = `No lyrics found for ${queue.songs[0].title}.`
            }
        }

        if (lyrics.length > 2048) {
            lyrics = lyrics.substring(0, 2045) + '...';
        }

        let lyricsEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Song lyrics')
            .setDescription(lyrics)
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')
        return message.channel.send(lyricsEmbed).catch(console.error)
    }
}
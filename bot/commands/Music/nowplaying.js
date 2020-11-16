const createBar = require("string-progressbar")
const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    name: "nowplaying",
    description: "Yoooo, what song is playing rn?",
    run: async (message, args, client, prefix, command) => {
        const queue = message.client.queue.get(message.guild.id)
        if (!queue) return message.reply("No song is being played right now.")
        const song = queue.songs[0]
        const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000
        const left = song.duration - seek

        let nowPlaying = new MessageEmbed()
            .setColor('#9f5000')
            .setTitle('Now playing')
            .setDescription(`${song.title}\n${song.video_url}`)
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')
            .addField(
                "\u200b",
                new Date(seek * 1000).toISOString().substr(11, 8) +
                "[" +
                createBar(song.duration === 0 ? seek : song.duration, seek, 20)[0] +
                "]" +
                (song.duration == 0 ? "◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)),
                false
            )

        if (song.duration > 0) {
            nowPlaying.setFooter("Time Remaining: " + new Date(left * 1000).toISOString().substr(11, 8))
        }

        return message.channel.send(nowPlaying)
    }
}
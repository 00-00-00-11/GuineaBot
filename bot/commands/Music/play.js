const {
    play
} = require("../../handlers/play")
const playconfig = {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    SOUNDCLOUD_CLIENT_ID: process.env.SOUNDCLOUD_CLIENT_ID
}
const ytdl = require("ytdl-core")
const YoutubeAPI = require("simple-youtube-api")
const youtube = new YoutubeAPI(playconfig.YOUTUBE_API_KEY)
const scdl = require("soundcloud-downloader")

module.exports = {
    name: "play",
    description: "Play a song in a voice channel",
    run: async (message, args, client, prefix, command) => {
        const channel = message.member.voice.channel

        const serverQueue = message.client.queue.get(message.guild.id)
        if (!channel) return message.reply('Join a voice channel')
        if (serverQueue && channel !== message.guild.me.voice.channel) return message.reply(`You must be in the same channel as ${message.client.user}`)
        if (!args[0]) return message.reply('Usage: g?play <youtube search | youtube URL (video or playlist) | soundcloud URL (song or playlist)>')

        if (!message.guild.me.hasPermission("CONNECT", explicit = true) || !message.guild.me.hasPermission("SPEAK")) {
            const permsEmbed = new Discord.MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Play unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("I don't have the correct permissions. Try re-inviting me and adding `Connect` and `Speak` permissions. If this problem occurs, do g?info support.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(permsEmbed)
            return
        }

        let search = args.join(" ")
        const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi
        const playlistPattern = /^.*(playlist\?list=)([^#\&\?]*).*/gi
        const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/
        const url = args[0]
        const urlValid = videoPattern.test(args[0])

        if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
            return message.client.commands.get("playlist").run(message, args, client, prefix, command)
        } else if (scdl.isValidUrl(url) && url.includes("/sets/")) {
            return message.client.commands.get("playlist").run(message, args, client, prefix, command)
        }

        const queueConstruct = {
            textChannel: message.channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true
        }

        let songInfo = null
        let song = null

        if (urlValid) {
            try {
                songInfo = await ytdl.getInfo(url)
                song = {
                    title: songInfo.videoDetails.title,
                    video_url: songInfo.videoDetails.video_url, //url
                    duration: songInfo.videoDetails.lengthSeconds
                }
                console.log("Play.js <commands> Line 70     " + songInfo)
            } catch (error) {
                console.error(error);
                return message.reply(error.message).catch(console.error);
            }
        } else if (scRegex.test(url)) {
            try {
                const trackInfo = await scdl.getInfo(url, playconfig.SOUNDCLOUD_CLIENT_ID)
                song = {
                    title: trackInfo.title,
                    video_url: trackInfo.permalink_url,
                    duration: Math.ceil(trackInfo.duration / 1000)
                }
            } catch (error) {
                if (error.statusCode === 404)
                    return message.reply("Could not find the Soundcloud track.").catch(console.error);
                return message.reply("There was an error playing that Soundcloud track.").catch(console.error);
            }
        } else {
            try {
                const results = await youtube.searchVideos(search, 1)
                songInfo = await ytdl.getInfo(results[0].url)
                song = {
                    title: songInfo.videoDetails.title,
                    video_url: songInfo.videoDetails.video_url, //url
                    duration: songInfo.videoDetails.lengthSeconds
                }
            } catch (error) {
                console.error(error);
                return message.reply(error.message).catch(console.error);
            }
        }

        if (serverQueue) {
            serverQueue.songs.push(song)
            return serverQueue.textChannel.send(`✅ **${song.title}** has been added to the queue by ${message.author}`).catch(console.error)
        }

        queueConstruct.songs.push(song)
        message.client.queue.set(message.guild.id, queueConstruct)

        try {
            queueConstruct.connection = await channel.join()
            await queueConstruct.connection.voice.setSelfDeaf(true)
            play(queueConstruct.songs[0], message)
        } catch (error) {
            message.client.queue.delete(message.guild.id);
            await channel.join()
            await message.guild.me.voice.channel.leave();
            console.log("Play.js <commands> Line 119      " + error)
            return message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
        }
    }
}
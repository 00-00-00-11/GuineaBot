const {
    play
} = require("../../handlers/play")
const playconfig = {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    SOUNDCLOUD_CLIENT_ID: process.env.SOUNDCLOUD_CLIENT_ID
}
const spotify = require('spotify-web-api-node')
const keyv = require('keyv')
const DB = new keyv("sqlite://token.sqlite", {
    namespace: 'spotifyToken'
})

const ytdl = require("ytdl-core")
const YoutubeAPI = require("simple-youtube-api")
const youtube = new YoutubeAPI(playconfig.YOUTUBE_API_KEY)
const scdl = require("soundcloud-downloader").default

const api = new spotify({
    clientId: process.env.SP_CLIENT_ID,
    clientSecret: process.env.SP_CLIENT_SECRET,
    redirectUri: "https://localhost:8888/callback"
})

module.exports = {
    name: "play",
    aliases: ["p"],
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<one of the following: Youtube search, Youtube video URL, soundcloud song URL, spotify song URL, spotify song URI>",
    description: "Play a song",
    category: "Music",
    run: async (message, args, text, client, prefix, instance) => {
        const channel = message.member.voice.channel

        const serverQueue = message.client.queue.get(message.guild.id)

        if (!channel) return message.reply('Join a voice channel')
        if (serverQueue && channel !== message.guild.me.voice.channel) return message.reply(`You must be in the same channel as ${message.client.user}`)
        if (!args[0]) return message.reply('Usage: g?play <youtube search | youtube URL (video or playlist) | soundcloud URL (song or playlist)>')

        if (!message.guild.me.hasPermission("CONNECT", explicit = true) || !message.guild.me.hasPermission("SPEAK")) {
            const permsEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
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
        const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/
        const spRegex = /^(spotify:track|https:\/\/[a-z]+\.spotify\.com\/track)/
        const url = args[0]
        const urlValid = videoPattern.test(args[0])

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
                    duration: songInfo.videoDetails.lengthSeconds,
                    thumbnail: songInfo.videoDetails.thumbnail.thumbnails[3].url
                }
                console.log("Play.js <commands> Line 70     " + songInfo)
            } catch (error) {
                if (error.message && error.message.includes("copyright")) {
                    return message.channel.send("⛔ The video could not be played due to copyright protection ⛔")
                } else {
                    console.error(error);
                    return message.reply(error.message).catch(console.error);
                }
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
        } else if (spRegex.test(url)) {
            let trackID

            if (url && url.includes("spotify:track:")) {
                let track = url.split(":")
                trackID = track[2]
            } else {
                let track = url.split("/")
                let track2 = track[4].split("?")
                trackID = track2[0]
            }

            let savedToken = await DB.get("TOKEN")
            let success

            if (!savedToken) {
                await api.clientCredentialsGrant().then(async data => {
                    token = data.body["access_token"]
                    expiresIn = data.body["expires_in"]
                    console.log('Generated new token\nThe access token expires in ' + expiresIn + ' seconds\nThe access token is ' + token);

                    api.setAccessToken(token)
                    DB.set("TOKEN", `${token}`, ((parseInt(expiresIn) * 1000) - (60 * 1000)))
                    success = true
                }).catch(err => {
                    console.log(err)
                    success = false
                })
            } else {
                api.setAccessToken(savedToken)
                success = true
            }

            if (success === true) {
                let dataFetched

                let spData = await api.getTrack(trackID).then(async data => {
                    dataFetched = data.body
                    let artistsA = []

                    let artists = dataFetched.artists.length

                    for (let i = 0; i < artists; i++) {
                        artistsA.push(dataFetched.artists[i].name)
                    }

                    let query = artistsA.join(", ") + " - " + dataFetched.name
                    return query
                }).catch(err => {
                    console.log(err)
                    return message.channel.send("An error occurred: " + err.message)
                })

                try {
                    const results = await youtube.searchVideos(spData)
                    songInfo = await ytdl.getInfo(results[0].url)
                    song = {
                        title: songInfo.videoDetails.title,
                        video_url: songInfo.videoDetails.video_url, //url
                        duration: songInfo.videoDetails.lengthSeconds,
                        thumbnail: songInfo.videoDetails.thumbnail.thumbnails[3].url
                    }
                } catch (error) {
                    console.log(error)
                    return message.channel.send("An error occurred: " + error.message)
                }
            } else return message.channel.send("Authorization unsuccessful, please contact ${Cy1der}#0001")
        } else {
            try {
                const results = await youtube.searchVideos(search, 1)
                songInfo = await ytdl.getInfo(results[0].url)
                song = {
                    title: songInfo.videoDetails.title,
                    video_url: songInfo.videoDetails.video_url, //url
                    duration: songInfo.videoDetails.lengthSeconds,
                    thumbnail: songInfo.videoDetails.thumbnail.thumbnails[3].url
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
            console.log(error)
            return message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
        }
    }
}
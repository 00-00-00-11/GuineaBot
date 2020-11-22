const {
    MessageEmbed
} = require("discord.js")
const {
    play
} = require("../../handlers/play")
const playlistconfig = {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    SOUNDCLOUD_CLIENT_ID: process.env.SOUNDCLOUD_CLIENT_ID
}
const YoutubeAPI = require("simple-youtube-api")
const youtube = new YoutubeAPI(playlistconfig.YOUTUBE_API_KEY)
const scdl = require("soundcloud-downloader")

module.exports = {
    name: "playlist",
    aliases: [ "pl"],
    minArgs: 1,
    maxArgs: -1,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <YouTube Playlist (name or URL) | soundcloud Playlist URL>`",
    description: "dc",
    run: async (message, args, text, client, prefix, instance) => {
        const {
            PRUNING
        } = require("../../config.json")
        const {
            channel
        } = message.member.voice

        const serverQueue = message.client.queue.get(message.guild.id)
        if (serverQueue && channel !== message.guild.me.voice.channel) return message.reply(`You must be in the same channel as ${message.client.user}`)

        if (!args.length) return message.reply(`Usage: g?playlist <YouTube Playlist URL | Playlist Name>`)
        if (!channel) return message.reply("You need to be in a voice channel first!")

        if (!message.guild.me.hasPermission("CONNECT", explicit = true) || !message.guild.me.hasPermission("SPEAK", explicit = true)) {
            const permEmbed = new MessageEmbed()
                .setColor('#9f5000')
                .setTitle('Playlist unsuccessful')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("I don't have the correct permissions. Try re-inviting me and adding `Connect` and `Speak` permissions. If this problem occurs, do g?info support.")
                .setThumbnail(message.client.user.avatarURL())
                .setTimestamp()
                .setFooter('Thank you for using GuineaBot!')
            message.channel.send(permEmbed)
            return
        }

        const search = args.join(" ")
        const pattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com)\/^.*(playlist\?list=)([^#\&\?]*).*/gi
        const url = args[0]
        const urlValid = pattern.test(args[0])

        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true
        }

        let song = null
        let playlist = null
        let videos = []

        if (urlValid) {
            try {
                playlist = await youtube.getPlaylist(url, {
                    part: "snippet"
                })
                videos = await playlist.getVideos(9007199254740991, {
                    part: "snippet"
                })
            } catch (error) {
                console.error(error);
                return message.reply("Playlist not found :(").catch(console.error);
            }
        } else if (scdl.isValidUrl(args[0])) {
            if (args[0].includes('/sets/')) {
                message.channel.send('⌛ Fetching the playlist...')
                playlist = await scdl.getSetInfo(args[0], playlistconfig.SOUNDCLOUD_CLIENT_ID)
                videos = playlist.tracks.map(track => ({
                    title: track.title,
                    url: track.permalink_url,
                    duration: track.duration / 1000
                }))
            }
        } else {
            try {
                const results = await youtube.searchPlaylists(search, 1, {
                    part: "snippet"
                });
                playlist = results[0];
                videos = await playlist.getVideos(9007199254740991, {
                    part: "snippet"
                });
            } catch (error) {
                console.error(error);
                return message.reply("Playlist not found :(").catch(console.error);
            }
        }

        videos.forEach((video) => {
            song = {
                title: video.title,
                video_url: video.url,
                duration: video.durationSeconds
            }

            if (serverQueue) {
                serverQueue.songs.push(song)
                if (!PRUNING) {
                    message.channel.send(`✅ **${song.title}** has been added to the queue by ${message.author}`)
                }
            } else {
                queueConstruct.songs.push(song)
            }
        })

        let playlistEmbed = new MessageEmbed()
            .setColor('#9f5000')
            .setTitle(`${playlist.title}`)
            .setURL(playlist.url)
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setThumbnail(message.client.user.avatarURL())
            .setTimestamp()
            .setFooter('Thank you for using GuineaBot!')

        if (!PRUNING) {
            playlistEmbed.setDescription(queueConstruct.songs.map((song, index) => `${index + 1}. ${song,title}`))
            if (playlistEmbed.description.length >= 2048) {
                playlistEmbed.description = playlistEmbed.description.substr(0, 2007) + "\nPlaylist larger than character limit..."
            }
        }

        message.channel.send(`${message.member} started a playlist, **${videos.length}** songs have been added to the queue.`, playlistEmbed)
        if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);

        if (!serverQueue) {
            try {
                queueConstruct.connection = await channel.join()
                await queueConstruct.connection.voice.setSelfDeaf(true)
                play(queueConstruct.songs[0], message)
            } catch (error) {
                console.error(error)
                message.client.queue.delete(message.guild.id)
                await channel.join()
                await channel.leave()
                return message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
            }
        }
    }
}
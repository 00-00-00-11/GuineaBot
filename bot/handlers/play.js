const ytdlDiscord = require("ytdl-core-discord")
const scdl = require("soundcloud-downloader")
const {
    PRUNING
} = require("../config.json")
const {
    canModifyQueue
} = require("../util/util")
const playconfig = {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    SOUNDCLOUD_CLIENT_ID: process.env.SOUNDCLOUD_CLIENT_ID
}
const YoutubeAPI = require("simple-youtube-api")
const youtube = new YoutubeAPI(playconfig.YOUTUBE_API_KEY)
const ytdl = require("ytdl-core")

module.exports = {
    async play(song, message) {
        const {
            channelID
        } = message.member.voice
        const botchannel = message.guild.me.voice.channelID

        const playconfig = {
            PRUNING: process.env.PRUNING,
            SOUNDCLOUD_CLIENT_ID: process.env.SOUNDCLOUD_CLIENT_ID
        }

        const queue = message.client.queue.get(message.guild.id)

        if (!song) {
            message.guild.me.voice.channel.leave();
            message.client.queue.delete(message.guild.id)
            return queue.textChannel.send("🚫 Music queue ended.").catch(console.error)
        }

        let stream = null
        let streamType = song.video_url && song.video_url.includes("youtube.com") ? "opus" : "ogg/opus"

        try {
            if (song.video_url && song.video_url.includes("youtube.com")) {
                stream = await ytdlDiscord(song.video_url, {
                    highWaterMark: 1 << 12
                })
            } else if (song.video_url && song.video_url.includes("soundcloud.com")) {
                try {
                    stream = await scdl.downloadFormat(
                        song.video_url,
                        scdl.FORMATS.OPUS,
                        playconfig.SOUNDCLOUD_CLIENT_ID ? playconfig.SOUNDCLOUD_CLIENT_ID : undefined
                    )
                } catch (error) {
                    stream = await scdl.downloadFormat(
                        song.video_url,
                        scdl.FORMATS.MP3,
                        playconfig.SOUNDCLOUD_CLIENT_ID ? playconfig.SOUNDCLOUD_CLIENT_ID : undefined
                    )
                    streamType = "unknown"
                }
            }
        } catch (error) {
            if (queue) {
                queue.songs.shift()
                module.exports.play(queue.songs[0], message)
            }

            console.error(error)
            return message.channel.send(`Error: ${error.message ? error.message : error}`);
        }

        queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id))

        console.log("Play.js <include> Line 58     " + streamType)
        const dispatcher = queue.connection
            .play(await stream, {
                type: streamType
            })
            .on("finish", () => {
                if (collector && !collector.ended) collector.stop()

                if (queue.loop) {
                    let lastSong = queue.songs.shift()
                    queue.songs.push(lastSong)
                    module.exports.play(queue.songs[0], message)
                } else {
                    queue.songs.shift()
                    module.exports.play(queue.songs[0], message)
                }
            })
            .on("error", (err) => {
                console.error(err)
                queue.songs.shift()
                module.exports.play(queue.songs[0], message)
            })
        dispatcher.setVolumeLogarithmic(queue.volume / 100)


        try {
            var playingMessage = await queue.textChannel.send(`🎶 Now playing: **${song.title}** ${song.video_url}`)
            await playingMessage.react("⏭")
            await playingMessage.react("⏯")
            await playingMessage.react("🔇")
            await playingMessage.react("🔉")
            await playingMessage.react("🔊")
            await playingMessage.react("🔁")
            await playingMessage.react("⏹")
            await playingMessage.react("🔀")
        } catch (error) {
            console.error(error)
        }

        const filter = (reaction, user) => user.id !== message.client.user.id
        var collector = playingMessage.createReactionCollector(filter, {
            time: song.duration > 0 ? song.duration * 1000 : 600000
        })

        collector.on("collect", (reaction, user) => {
            if (!queue) return;

            switch (reaction.emoji.name) {
                case "⏭":
                    reaction.users.remove(user).catch(console.error)
                    if (!canModifyQueue(message.member, message.channel)) return
                    queue.playing = true
                    queue.connection.dispatcher.end()
                    queue.textChannel.send(`${user} ⏭ skipped the song`).catch(console.createReactionCOllector)
                    collector.stop()
                    break
                case "⏯":
                    reaction.users.remove(user).catch(console.error)
                    if (!canModifyQueue(message.member, message.channel)) return
                    if (queue.playing) {
                        queue.playing = !queue.playing
                        queue.connection.dispatcher.pause(true)
                        queue.textChannel.send(`${user} ⏸ paused the music`).catch(console.error)
                    } else {
                        queue.playing = !queue.playing
                        queue.connection.dispatcher.resume()
                        queue.textChannel.send(`${user} ▶ resumed the music!`)
                    }
                    break
                case "🔇":
                    reaction.users.remove(user).catch(console.error)
                    if (!canModifyQueue(message.member, message.channel)) return
                    if (queue.volume <= 0) {
                        queue.volume = 100
                        queue.connection.dispatcher.setVolumeLogarithmic(100 / 100)
                        queue.textChannel.send(`${user} 🔊 unmuted the music!`)
                    } else {
                        queue.volume = 0
                        queue.connection.dispatcher.setVolumeLogarithmic(0)
                        queue.textChannel.send(`${user} 🔇 muted the music`)
                    }
                    break
                case "🔉":
                    reaction.users.remove(user).catch(console.error)
                    if (!canModifyQueue(message.member, message.channel)) return
                    if (queue.volume - 10 <= 0) queue.volume = 0
                    else queue.volume = queue.volume - 10
                    queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100)
                    queue.textChannel.send(`${user} 🔉 decreased the volume, the volume is now ${queue.volume}%`).catch(console.error)
                    break
                case "🔁":
                    reaction.users.remove(user).catch(console.error)
                    if (!canModifyQueue(message.member, message.channel)) return
                    queue.loop = !queue.loop
                    queue.textChannel.send(`Loop is now ${queue.loop ? "**enabled**" : "**disabled**"}`).catch(console.error)
                    break
                case "🔊":
                    reaction.users.remove(user).catch(console.error);
                    if (!canModifyQueue(message.member, message.channel)) return
                    if (queue.volume + 10 >= 100) queue.volume = 100;
                    else queue.volume = queue.volume + 10;
                    queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
                    queue.textChannel.send(`${user} 🔊 increased the volume, the volume is now ${queue.volume}%`).catch(console.error);
                    break;
                case "⏹":
                    reaction.users.remove(user).catch(console.error)
                    if (!canModifyQueue(message.member, message.channel)) return
                    queue.songs = []
                    queue.textChannel.send(`${user} ⏹ stopped the music`).catch(console.error)
                    try {
                        queue.connection.dispatcher.end()
                    } catch (error) {
                        console.error(error)
                        queue.connection.disconnect()
                    }
                    collector.stop()
                    break
                case "🔀":
                    reaction.users.remove(user).catch(console.error)
                    if (!canModifyQueue(message.member, message.channel)) return
                    let songs = queue.songs
                    for (let i = songs.length - 1; i > 1; i--) {
                        let j = 1 + Math.floor(Math.random() * i);
                        [songs[i], songs[j]] = [songs[j], songs[i]]
                    }
                    queue.songs = songs
                    message.client.queue.set(message.guild.id, queue)
                    queue.textChannel.send(`${message.author} 🔀 shuffled the queue`).catch(console.error)
                    break
                default:
                    reaction.users.remove(user).catch(console.error)
                    break
            }
        })

        collector.on("end", () => {
            playingMessage.reactions.removeAll().catch(console.error)
            if (PRUNING && playingMessage && !playingMessage.deleted) {
                playingMessage.delete({
                    timeout: 3000
                }).catch(console.error)
            }
        })
    }
}
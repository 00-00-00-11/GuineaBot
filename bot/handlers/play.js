const ytdlDiscord = require("ytdl-core-discord")
const scdl = require("soundcloud-downloader")
const { PRUNING } = require("../config.json")
const { canModifyQueue } = require("../util/util")

module.exports = {
    category: "Music",
    description: "Music handler",
    async play(song, message) {
        const playconfig = {
            PRUNING: process.env.PRUNING,
            SOUNDCLOUD_CLIENT_ID: process.env.SOUNDCLOUD_CLIENT_ID
        }

        //Fetch the song queue declared in index.js line 15
        const queue = message.client.queue.get(message.guild.id)

        //Song is declared in the play.js command file, this file is just the function to play the music itself
        if (!song) {
            //Leave the channel, delete the queue and notify users
            message.guild.me.voice.channel.leave();
            message.client.queue.delete(message.guild.id)
            return queue.textChannel.send("🚫 Music queue ended.").catch(console.error)
        }

        let stream = null

        /*If the song is from YouTube, the stream type is discord.js's prefered stream type, opus.
        * If the song is anywhere not from Youtube, the stream type is opus with the .ogg audio file type.
        */
        let streamType = song.video_url && song.video_url.includes("youtube.com") ? "opus" : "ogg/opus"

        try {
            //Check if the song is from YouTube again, and declare stream's value with the audio stream, then limit the memory usage (highWaterMark)
            if (song.video_url && song.video_url.includes("youtube.com")) {
                stream = await ytdlDiscord(song.video_url, {
                    quality: 'highestaudio',
                    highWaterMark: 1 << 25,
                    filter: "audioonly",
                })
            //If the song is from soundcloud
            } else if (song.video_url && song.video_url.includes("soundcloud.com")) {
                try {
                    //Declare stream's value with the stream itself, and the client ID, which acts as the API key
                    stream = await scdl.downloadFormat(
                        song.video_url,
                        scdl.FORMATS.OPUS,
                        playconfig.SOUNDCLOUD_CLIENT_ID ? playconfig.SOUNDCLOUD_CLIENT_ID : undefined
                    )
                } catch (error) {
                    //If there is an error, stream becomes the same thing but the file type becomes .mp3 and the stream type becomes unknown, scary
                    stream = await scdl.downloadFormat(
                        song.video_url,
                        scdl.FORMATS.MP3,
                        playconfig.SOUNDCLOUD_CLIENT_ID ? playconfig.SOUNDCLOUD_CLIENT_ID : undefined
                    )
                    streamType = "unknown"
                }
            }
        } catch (error) {
            //If any error occurrs when playing the song, skip to the next song in the queue and print the error message in the console
            if (queue) {
                queue.songs.shift()
                module.exports.play(queue.songs[0], message)
            }

            console.error(error)
            return message.channel.send(`Error: ${error.message ? error.message : error}`);
        }

        //If a moderator manually disconnects GuineaBot from the voice channel or it leaves by itself, clear the queue
        queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id))

        //Here you actually play the song using the stream type declared above
        const dispatcher = queue.connection
            .play(await stream, {
                type: streamType
            })
            //When the file (aka song) finishes, the reaction collector stops
            .on("finish", () => {
                if (collector && !collector.ended) collector.stop()

                //Check if the current song is toggled to loop, and shift the song to the next position in the queue
                if (queue.loop) {
                    let lastSong = queue.songs.shift()
                    queue.songs.push(lastSong)
                    module.exports.play(queue.songs[0], message)
                } else {
                    //If not, play the next song in the queue
                    queue.songs.shift()
                    module.exports.play(queue.songs[0], message)
                }
            })
            .on("error", (err) => {
                //Any error here skips the song and plays the next song in the queue and prints the error message to the console
                console.error(err)
                queue.songs.shift()
                module.exports.play(queue.songs[0], message)
            })

        //By default, the volume is 100%
        dispatcher.setVolumeLogarithmic(queue.volume / 100)


        try {
            //Send the message stating a new song has started, and react to that message with the emojis below
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

        //Filter who can react to the reactions, and the code will be run if the user reacted before the song ended
        const filter = (reaction, user) => user.id !== message.client.user.id
        var collector = playingMessage.createReactionCollector(filter, {
            time: song.duration > 0 ? song.duration * 1000 : 600000
        })

        //Collect the reaction
        collector.on("collect", (reaction, user) => {
            //Check if there is no queue, and end the code here if returned true
            if (!queue) return;

            //Run the code based on what emoji the user reacted to, by default, the reaction is removed after
            switch (reaction.emoji.name) {
                case "⏭":
                    reaction.users.remove(user).catch(console.error)
                    //Check if the user is able to modify the queue, see ./util/util.js for more details
                    if (!canModifyQueue(message.member, message.channel)) return

                    //Switch the queue's state to playing and end the current dispatcher
                    queue.playing = true
                    queue.connection.dispatcher.end()

                    //Notify the chat, and stop the code
                    queue.textChannel.send(`${user} ⏭ skipped the song`).catch(console.createReactionCOllector)
                    collector.stop()
                    break
                case "⏯":
                    reaction.users.remove(user).catch(console.error)
                     //Check if the user is able to modify the queue, see ./util/util.js for more details
                    if (!canModifyQueue(message.member, message.channel)) return

                    //If the queue is currently playing
                    if (queue.playing) {
                        //The state becomes the opposite, pause the current song and notify the chat
                        queue.playing = !queue.playing
                        queue.connection.dispatcher.pause(true)
                        queue.textChannel.send(`${user} ⏸ paused the music`).catch(console.error)
                    } else { 
                        //If the queue is currently paused, switch to playing and notify the chat
                        queue.playing = !queue.playing
                        queue.connection.dispatcher.resume()
                        queue.textChannel.send(`${user} ▶ resumed the music!`)
                    }
                    break
                case "🔇":
                    reaction.users.remove(user).catch(console.error)
                     //Check if the user is able to modify the queue, see ./util/util.js for more details
                    if (!canModifyQueue(message.member, message.channel)) return
                    //If the song's volume is lower than or equal to 0, set the song's volume to 100%, and notify the chat
                    if (queue.volume <= 0) {
                        queue.volume = 100
                        queue.connection.dispatcher.setVolumeLogarithmic(100 / 100)
                        queue.textChannel.send(`${user} 🔊 unmuted the music!`)
                    } else {
                        //If not, mute the music and notify the chat
                        queue.volume = 0
                        queue.connection.dispatcher.setVolumeLogarithmic(0)
                        queue.textChannel.send(`${user} 🔇 muted the music`)
                    }
                    break
                case "🔉":
                    reaction.users.remove(user).catch(console.error)
                     //Check if the user is able to modify the queue, see ./util/util.js for more details
                    if (!canModifyQueue(message.member, message.channel)) return
                    //Check if the song's volume (minus 10) is lower than or equal to 0, set the song's volume to 0
                    if (queue.volume - 10 <= 0) queue.volume = 0
                    else queue.volume = queue.volume - 10 //If not, the volume will be decreased by 10%

                    //Set the volume and notify the chat
                    queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100)
                    queue.textChannel.send(`${user} 🔉 decreased the volume, the volume is now ${queue.volume}%`).catch(console.error)
                    break
                case "🔁":
                    reaction.users.remove(user).catch(console.error)
                     //Check if the user is able to modify the queue, see ./util/util.js for more details
                    if (!canModifyQueue(message.member, message.channel)) return

                    //Switch the loop status and notify the chat
                    queue.loop = !queue.loop
                    queue.textChannel.send(`Loop is now ${queue.loop ? "**enabled**" : "**disabled**"}`).catch(console.error)
                    break
                case "🔊":
                    reaction.users.remove(user).catch(console.error);
                     //Check if the user is able to modify the queue, see ./util/util.js for more details
                    if (!canModifyQueue(message.member, message.channel)) return
                    if (queue.volume + 10 >= 100) queue.volume = 100; //If the song's volume (plus 10) is greater than or equal to 100, the song's volume will be set to 100 instead
                    else queue.volume = queue.volume + 10; //If not, increment the volume by 10 and notify the chat
                    queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
                    queue.textChannel.send(`${user} 🔊 increased the volume, the volume is now ${queue.volume}%`).catch(console.error);
                    break;
                case "⏹": // ! Square = stop for all the dummies out there :)
                    reaction.users.remove(user).catch(console.error)
                     //Check if the user is able to modify the queue, see ./util/util.js for more details
                    if (!canModifyQueue(message.member, message.channel)) return
                    //Set the queue to nothing
                    queue.songs = []
                    queue.textChannel.send(`${user} ⏹ stopped the music`).catch(console.error) //Notify the chat

                    //End dispatcher, if not, disconnect from the voice channel
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

                    //Declare songs, value is exact same as the song queue
                    let songs = queue.songs

                    //For every song, randomize the position, and switch values
                    for (let i = songs.length - 1; i > 1; i--) {
                        let j = 1 + Math.floor(Math.random() * i);
                        [songs[i], songs[j]] = [songs[j], songs[i]]
                    }

                    //Set the song queue to the shuffled array and notify the chat
                    queue.songs = songs
                    message.client.queue.set(message.guild.id, queue)
                    queue.textChannel.send(`${message.author} 🔀 shuffled the queue`).catch(console.error)
                    break
                default:
                    //Remove the reaction from the message
                    reaction.users.remove(user).catch(console.error)
                    break
            }
        })

        //When the song ends, remove all the reactions and delete the message
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
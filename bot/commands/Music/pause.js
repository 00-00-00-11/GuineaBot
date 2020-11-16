const {
    canModifyQueue
} = require("../../util/util")

module.exports = {
    name: "pause",
    description: "Pause music",
    run: async (message, args, client, prefix, command) => {
        const queue = message.client.queue.get(message.guild.id)
        if (!queue) return message.reply("No song is being played right now.")
        if (!canModifyQueue(message.member, message.channel)) return

        if (queue.playing) {
            queue.playing = false
            queue.connection.dispatcher.pause(true)
            return queue.textChannel.send(`${message.author} ⏸ paused the music.`)
        }
    }
}
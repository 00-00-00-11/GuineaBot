const {
    canModifyQueue
} = require("../../util/util")

module.exports = {
    name: "pause",
    minArgs: 0,
    maxArgs: 0,
    description: "pause",
    run: async (message, args, text, client, prefix, instance) => {
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
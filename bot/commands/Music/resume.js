const {
    canModifyQueue
} = require("../../util/util")

module.exports = {
    name: "resume",
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND}`",
    description: "dc",
    run: async (message, args, client, prefix, command) => {
        const queue = message.client.queue.get(message.guild.id)
        if (!queue) return message.reply("No song is being played right now.")
        if (!canModifyQueue(message.member, message.channel)) return
        if (!queue.playing) {
            queue.playing = true
            queue.connection.dispatcher.resume()
            return queue.textChannel.send(`${message.author} ▶ resumed the music!`)
        }

        return message.reply("The queue is not paused.")
    }
}
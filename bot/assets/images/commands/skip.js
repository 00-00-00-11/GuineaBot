const { canModifyQueue } = require("../util/util")

module.exports = {
    name: "skip",
    description: "skip",
    run: async(message, args, client) => {
        const queue = message.client.queue.get(message.guild.id)
        if (!queue) return message.reply("No song is being played right now.")
        if (!canModifyQueue(message.member, message.channel)) return  
        queue.playing = true
        queue.connection.dispatcher.end()
        queue.textChannel.send(`${message.author} ⏭ skipped the song`).catch(console.error)
    }
}
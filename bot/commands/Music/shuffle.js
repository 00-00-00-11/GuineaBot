const {
    canModifyQueue
} = require("../../util/util")

module.exports = {
    name: "shuffle",
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND}`",
    description: "dc",
    run: async (message, args, client, prefix, command) => {
        const queue = message.client.queue.get(message.guild.id)
        if (!queue) return message.channel.send("There is no queue.")
        if (!canModifyQueue(message.member, message.channel)) return

        let songs = queue.songs
        for (let i = songs.length - 1; i > 1; i--) {
            let j = 1 + Math.floor(Math.random() * i);
            [songs[i], songs[j]] = [songs[j], songs[i]]
        }
        queue.songs = songs
        message.client.queue.set(message.guild.id, queue)
        queue.textChannel.send(`${message.author} 🔀 shuffled the queue.`).catch(console.error)
    }
}
const {
    canModifyQueue
} = require("../../util/util")
module.exports = {
    name: "remove",
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<queue position number>",
    description: "Remove a song from the queue",
    category: "Music",
    run: async (message, args, text, client, prefix, instance) => {
        const queue = message.client.queue.get(message.guild.id)
        if (!queue) return message.channel.send("There is no queue.")
        if (!canModifyQueue(message.member, message.channel)) return

        if (!args.length) return message.reply("Usage: g?remove <queue number>")
        if (isNaN(args[0])) return message.reply("Usage: g?remove <queue number>")

        const song = queue.songs.splice(args[0] - 1, 1)
        queue.textChannel.send(`${message.author} ❌ removed **${song[0].title}** from the queue`)
    }
}
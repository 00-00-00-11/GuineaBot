const {
    canModifyQueue
} = require("../../util/util")
module.exports = {
    name: "remove",
    minArgs: 1,
    maxArgs: 1,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <queue number>",
    description: "dc",
    run: async (message, args, client, prefix, command) => {
        const queue = message.client.queue.get(message.guild.id)
        if (!queue) return message.channel.send("There is no queue.")
        if (!canModifyQueue(message.member, message.channel)) return

        if (!args.length) return message.reply("Usage: g?remove <queue number>")
        if (isNaN(args[0])) return message.reply("Usage: g?remove <queue number>")

        const song = queue.songs.splice(args[0] - 1, 1)
        queue.textChannel.send(`${message.author} ❌ removed **${song[0].title}** from the queue`)
    }
}
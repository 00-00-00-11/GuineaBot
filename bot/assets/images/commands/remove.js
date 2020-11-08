const { canModifyQueue } = require("../util/util")
module.exports = {
    name: "remove",
    description: "remove",
    run: async(message, args, client) => {
        const queue = message.client.queue.get(message.guild.id)
        if (!queue) return message.channel.send("There is no queue.")
        if (!canModifyQueue(message.member, message.channel)) return  
        
        if (!args.length) return message.reply("Usage: g?remove <queue number>")
        if (isNaN(args[0])) return message.reply("Usage: g?remove <queue number>")

        const song = queue.songs.splice(args[0] - 1, 1)
        queue.textChannel.send(`${message.author} ❌ removed **${song[0].title}** from the queue`)
    }
}
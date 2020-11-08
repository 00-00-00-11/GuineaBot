const { canModifyQueue } = require("../util/util")

module.exports = {
    name: "loop",
    description: 'loop',
    run: async(message, args, client) => {
        const queue = message.client.queue.get(message.guild.id)
        if (!queue) return message.reply("No song is being played right now.")
        if (!canModifyQueue(message.member, message.channel)) return  

        queue.loop = !queue.loop
        return queue.textChannel.send(`Loop is now ${queue.loop ? "**enabled**" : "**disabled**"}`).catch(console.error)
    }
}
const { canModifyQueue } = require("../../util/util")

module.exports = {
    name: "loop",
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND}`",
    description: "loop",
    run: async(message, args, client, prefix, command) => {
        const queue = message.client.queue.get(message.guild.id)
        if (!queue) return message.reply("No song is being played right now.")
        if (!canModifyQueue(message.member, message.channel)) return  

        queue.loop = !queue.loop
        return queue.textChannel.send(`Loop is now ${queue.loop ? "**enabled**" : "**disabled**"}`).catch(console.error)
    }
}
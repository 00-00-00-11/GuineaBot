const {
    canModifyQueue
} = require("../../util/util")

module.exports = {
    name: "volume",
    aliases: [ "v"],
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<number (0-100)>",
    description: "dc",
    run: async (message, args, text, client, prefix, instance) => {
        const queue = message.client.queue.get(message.guild.id)

        if (!queue) return message.reply("No song is playing right now.")
        if (!canModifyQueue(message.member, message.channel)) return

        if (!args[0]) return message.reply(`🔊 Current volume: **${queue.volume}%**`)

        if (isNaN(args[0])) return message.reply("Please use a number to set the volume.")
        if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0) return message.reply("Please use a number between 0 - 100.")

        queue.volume = args[0]
        queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)
        return queue.textChannel.send(`Volume set to: **${args[0]}%**`)
    }
}
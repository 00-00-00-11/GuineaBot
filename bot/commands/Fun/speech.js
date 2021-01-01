const bruh = require("bruhapi")

module.exports = {
    name: "speech",
    aliases: ["tts"],
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: "<text to speech>",
    description: "Convert text to speech",
    category: "Fun & Games",
    run: async ({ message, args, text, client, prefix, instance }) => {
        return message.channel.send("This command is disabled until the endpoint is restored.")
        message.reply("Please wait as your text is being processed.").then(emsg => emsg.delete({
            timeout: 10000
        }))
        message.channel.send(await bruh(`/tts/${text}`))
    }
}
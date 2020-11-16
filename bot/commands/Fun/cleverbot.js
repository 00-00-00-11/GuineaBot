const cleverbot = require("cleverbot-free")

module.exports = {
    name: "cleverbot",
    category: "fun",
    description: "This is Cleverbot but free and used in Discord!",
    run: async (message, args, client, prefix, command) => {
        const text = args.slice(0).join(" ")

        if (!text) return message.channel.send("Cleverbot won't respond to nothing. :P")

        cleverbot(text).then(response => message.reply(response));
    }
}
const ttt = require("discord-tictactoe")

module.exports = {
    name: "tictactoe",
    aliases: [ "ttt" ],
    minArgs: 0,
    maxArgs: 0,
    description: "Simple game of ttt against an AI",
    run: async (message, args, text, client, prefix, instance) => {
        new ttt({
            language: "en",
            command:  prefix + module.exports.name
        }, client)
    }
}
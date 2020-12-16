const ttt = require("discord-tictactoe")

module.exports = {
    name: "tictactoe",
    aliases: [ "ttt" ],
    minArgs: 0,
    maxArgs: 0,
    description: "Simple game of TicTacToe against an unbeatable AI",
    category: "Fun & Games",
    run: async (message, args, text, client, prefix, instance) => {
        new ttt({
            language: "en",
            command:  prefix + module.exports.name
        }, client)
    }
}
const ttt = require("discord-tictactoe")

module.exports = {
    name: "tictactoe",
    category: "games",
    description: "Tictactoe game",
    run: async (message, args, client, prefix, command) => {
        await new ttt({
            language: "en",
            command: `${prefix}${command}`
        }, client)
    }
}
const Hangman = require("./assets/hangman")
module.exports = {
    name: "hangman",
    category: "games",
    description: "hangman game",
    run: async (message, args, client) => {
        const game = new Hangman(client)
        game.newGame(message)
    }
}
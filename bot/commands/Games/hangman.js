const { HangmanGame } = require("./assets/hangman")
module.exports = {
    name: "hangman",
    aliases: [ "hang" ],
    minArgs: 0,
    maxArgs: 0,
    description: "Hang man game, the whole chat can play",
    category: "Fun & Games",
    run: async (message, args, text, client, prefix, instance) => {
        //Call a new instance of Hangman
        const game = new HangmanGame(client)

        //Start the game
        game.newGame(message)
    }
}
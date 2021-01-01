const { Chess } = require("./assets/chess")
module.exports = {
    name: "chess",
    minArgs: 0,
    maxArgs: 0,
    description: "Simple game of chess against an AI",
    category: "Fun & Games",
    run: async ({ message, args, text, client, prefix, instance }) => {
        //Call the class
        const game = new Chess(client)

        //Call the new game function and boom, donezo
        game.newGame(message)
    }
}
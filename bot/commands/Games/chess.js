const Chess = require("./assets/chess")
module.exports = {
    name: "chess",
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND}`",
    description: "Simple game of chess against an AI",
    run: async (message, args, text, client, prefix, instance) => {
        //Call the class
        const game = new Chess(client)

        //Call the new game function and boom, donezo
        game.newGame(message)
    }
}
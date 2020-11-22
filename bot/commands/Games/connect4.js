const Connect4 = require("./assets/connect4")
module.exports = {
    name: "connect4",
    aliases: [ "c4" ],
    minArgs: 1,
    maxArgs: 1,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND} <player 2 mention>`",
    description: "Connect4 game with others",
    run: async (message, args, text, client, prefix, instance) => {
        //Call a new instance of the class
        const connect4 = new Connect4(client)

        //Start the game
        connect4.newGame(message);
    }
}
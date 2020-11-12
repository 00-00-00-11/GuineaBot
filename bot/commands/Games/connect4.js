const Connect4 = require("./assets/connect4")
module.exports = {
    name: "connect4",
    category: "games",
    description: "Connect4 game",
    run: async (message, args, client) => {
        const connect4 = new Connect4(client)
        connect4.newGame(message);
    }
}
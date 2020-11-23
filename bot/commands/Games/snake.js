const Discord = require("discord.js")
const snake = require("snakecord")

module.exports = {
    name: "snake",
    minArgs: 0,
    maxArgs: 0,
    description: "Snake game in Discord!",
    run: async (message, args, text, client, prefix, instance) => {
        //Initiate the new class
        const snakeGame = new snake({
            title: "Snake Game",
            color: "#9f5000",
            timestamp: true,
            gameOverTitle: "You heckin won!"
        })

        snakeGame.newGame(message)
    }
}
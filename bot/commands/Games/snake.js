const Discord = require("discord.js")
const snake = require("snakecord")

module.exports = {
    name: "snake",
    category: "games",
    description: "Snake game in Discord!",
    run: async (message, args) => {
        const snakeGame = new snake({
            title: "Snake Game",
            color: "#9f5000",
            timestamp: true,
            gameOverTitle: "Game Over"
        })

        snakeGame.newGame(message)
    }
}
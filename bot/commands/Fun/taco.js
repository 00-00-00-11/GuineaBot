const bruh = require("bruhapi")

module.exports = {
    name: "taco",
    minArgs: 0,
    maxArgs: 0,
    description: "Get a random taco image",
    category: "Fun",
    run: async (message, args, text, client, prefix, instance) => {
        message.channel.send(await bruh(`/taco`))
    }
}
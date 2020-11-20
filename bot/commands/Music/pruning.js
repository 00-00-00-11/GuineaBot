const fs = require("fs")
const config = require("../../config.json")

module.exports = {
    name: "pruning",
    minArgs: 0,
    maxArgs: 0,
    syntaxError: "You provided invalid syntax. Valid syntax for this command is `{PREFIX}{COMMAND}`",
    description: "dc",
    run: async (message, args, client, prefix, command) => {
        config.PRUNING = !config.PRUNING

        fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
            if (err) {
                console.log(err)
                return message.channel.send("There was an error writing to the file.")
            }

            return message.channel.send(`Message pruning ${config.PRUNING ? "**enabled**" : "**disabled**"}`)
        })
    }
}
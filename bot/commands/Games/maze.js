const mazegeneration = require('maze-generation');
module.exports = {
    name: 'maze',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<difficulty (easy, medium, hard)>",
    description: 'Maze generator',
    category: 'Fun & Games',
    run: async ({
        message,
        args,
        text,
        client,
        prefix,
        instance
    }) => {
        if (args[0].toLowerCase() === "easy") {
            let mazestr = mazegeneration(10, 10, Math.floor(Math.random() * Number.MAX_SAFE_INTEGER), "DEPTHFIRST").toString()
            return message.channel.send("```css\n ↓ Start here\n" + mazestr.replaceAt(mazestr.length - 2, " ").replaceAt(1, " ") + " ← Finish here\n```")
        } else if (args[0].toLowerCase() === "medium") {
            let mazestr = mazegeneration(20, 20, Math.floor(Math.random() * Number.MAX_SAFE_INTEGER), "DEPTHFIRST").toString()
            return message.channel.send("```css\n ↓ Start here\n" + mazestr.replaceAt(mazestr.length - 2, " ").replaceAt(1, " ") + " ← Finish here\n```")
        } else if (args[0].toLowerCase() === "hard") {
            let mazestr = mazegeneration(30, 30, Math.floor(Math.random() * Number.MAX_SAFE_INTEGER), "DEPTHFIRST").toString()
            return message.channel.send("```css\n ↓ Start here\n" + mazestr.replaceAt(mazestr.length - 2, " ").replaceAt(1, " ") + " ← Finish here\n```")
        }
    }
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}